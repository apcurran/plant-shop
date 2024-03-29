"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { db } = require("../../db/index");
const { prepareLineItems } = require("../../util/prepare-line-items");
const { saveOrderInfoToDb } = require("../../util/save-order-info-to-db");
const { calcOrderTotal } = require("../../util/calc-order-total");

async function getOrderHistory(req, res, next) {
    const userId = req.user._id;

    try {
        await db.task(async (currTask) => {
            const ordersArr = await currTask.manyOrNone(`
                SELECT
                    app_user_order.order_id AS "orderId",
                    app_user_order.total_cost AS "totalCost",
                    app_user_order.created_at AS "createdAt",
                    app_user_order.stripe_payment_id AS "stripePaymentId"
                FROM app_user_order
                WHERE app_user_order.user_id = $<userId>
                ORDER BY app_user_order.created_at DESC
            `, { userId });

            const formattedOrders = await Promise.all(ordersArr.map(async (order) => {
                const orderItemsArr = await currTask.manyOrNone(`
                    SELECT
                        product.title,
                        product.category,
                        product.product_id AS "productId",
                        product_extra_info.size,
                        product_extra_info.price,
                        app_user_order_item.product_qty AS "productQty",
                        app_user_order_item.product_extra_info_id AS "productExtraInfoId",
                        product_img.public_id AS "publicId",
                        product_img.alt_text AS "altText",
                        product_img.width,
                        product_img.height
                    FROM app_user_order_item
                    INNER JOIN
                        product ON app_user_order_item.product_id = product.product_id
                    INNER JOIN
                        product_extra_info ON product.product_id = product_extra_info.product_id
                    INNER JOIN
                        product_img ON product.product_id = product_img.product_id
                    WHERE
                        app_user_order_item.order_id = $<order>
                        AND
                        product_extra_info.product_extra_info_id = app_user_order_item.product_extra_info_id
                `, { order: order.orderId });
    
                return {
                    ...order,
                    orderItems: orderItemsArr
                };
            })).catch((err) => next(err));
    
            res.json(formattedOrders);
        });

    } catch (err) {
        next(err);
    }
}

async function postCreatePaymentIntent(req, res, next) {
    const { currItemsArr } = req.body.cartData;

    try {
        await db.task(async (currTask) => {
            let itemsInfoFromDb = [];
    
            for (let itemObj of currItemsArr) {
                const prodId = Number(itemObj.productId);
                const productExtraInfoId = itemObj.productExtraInfoId;
                const productQuantity = itemObj.itemQuantity;
                const itemInfo = await currTask.one(`
                    SELECT
                        product.title,
                        product_extra_info.size,
                        CAST(product_extra_info.price AS INTEGER)
                    FROM product
                    INNER JOIN
                        product_extra_info ON product.product_id = product_extra_info.product_id
                    WHERE
                        product.product_id = $<prodId>
                        AND
                        product_extra_info.product_extra_info_id = $<productExtraInfoId>
                `, { prodId, productExtraInfoId });
    
                const revisedItemInfo = {
                    productId: prodId,
                    productExtraInfoId,
                    productQuantity,
                    ...itemInfo
                };
    
                itemsInfoFromDb.push(revisedItemInfo);
            }
    
            // Payment total
            const orderTotal = calcOrderTotal(itemsInfoFromDb);
            // Save order to db
            const userId = req.user._id;
            const shippingAddress = {
                street: req.body.userData.street,
                city: req.body.userData.city,
                state: req.body.userData.state,
                zip: req.body.userData.zip
            };
            const now = new Date();
    
            // Save payment order and order items to db
            const orderId = await saveOrderInfoToDb(itemsInfoFromDb, userId, orderTotal, shippingAddress, now, currTask, next);
    
            // Convert to Stripe API format
            const preparedLineItems = prepareLineItems(itemsInfoFromDb, currItemsArr);
            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                line_items: preparedLineItems,
                success_url: `${process.env.CLIENT_URL}/success?sessionId={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
                cancel_url: `${process.env.CLIENT_URL}/cart`
            });
            const redirectUrl = session.url;
    
            // Payment cancellation
            res.json({ url: redirectUrl });
        });

    } catch (err) {
        next(err);
    }
}

async function patchCompleteCheckout(req, res, next) {
    try {
        const { sessionId, orderId } = req.body;

        await db.none(`
            UPDATE app_user_order
            SET
                stripe_payment_id = $<sessionId>,
                is_complete = TRUE
            WHERE order_id = $<orderId>
        `, { sessionId, orderId });

        res.status(200).json({ msg: "Payment successful" });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getOrderHistory,
    postCreatePaymentIntent,
    patchCompleteCheckout
};