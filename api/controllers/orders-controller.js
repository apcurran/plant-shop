import Stripe from "stripe";

import { db } from "../../db/index.js";
import { prepareLineItems } from "../../util/prepare-line-items.js";
import { saveOrderInfoToDb } from "../../util/save-order-info-to-db.js";
import { calcOrderTotal } from "../../util/calc-order-total.js";
import { createPaymentIntentValidation } from "../validation/orders-validation.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function getOrderHistory(req, res, next) {
    const userId = req.user._id;

    try {
        await db.task(async (currTask) => {
            const ordersArr = await currTask.manyOrNone(
                `
                SELECT
                    app_user_order.order_id AS "orderId",
                    app_user_order.total_cost AS "totalCost",
                    app_user_order.created_at AS "createdAt",
                    app_user_order.stripe_payment_id AS "stripePaymentId"
                FROM app_user_order
                WHERE app_user_order.user_id = $<userId>
                ORDER BY app_user_order.created_at DESC
            `,
                { userId },
            );

            const formattedOrders = await Promise.all(
                ordersArr.map(async (order) => {
                    const orderItemsArr = await currTask.manyOrNone(
                        `
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
                `,
                        { order: order.orderId },
                    );

                    return {
                        ...order,
                        orderItems: orderItemsArr,
                    };
                }),
            );

            res.json(formattedOrders);
        });
    } catch (err) {
        next(err);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function postCreatePaymentIntent(req, res, next) {
    try {
        const { userData, items } = await createPaymentIntentValidation(
            req.body,
        );

        await db.task(async (currTask) => {
            let itemsInfoFromDb = [];

            for (let item of items) {
                const { productId, productExtraInfoId, itemQuantity } = item;
                const itemInfo = await currTask.one(
                    `
                    SELECT
                        product.title,
                        product_extra_info.size,
                        CAST(product_extra_info.price AS INTEGER)
                    FROM product
                    INNER JOIN
                        product_extra_info ON product.product_id = product_extra_info.product_id
                    WHERE
                        product.product_id = $<productId>
                        AND
                        product_extra_info.product_extra_info_id = $<productExtraInfoId>
                `,
                    { productId, productExtraInfoId },
                );

                const revisedItemInfo = {
                    productId,
                    productExtraInfoId,
                    productQuantity: itemQuantity,
                    ...itemInfo,
                };
                itemsInfoFromDb.push(revisedItemInfo);
            }

            // Payment total
            const orderTotal = calcOrderTotal(itemsInfoFromDb);

            // Validate order total is valid and reasonable
            if (
                typeof orderTotal !== "number" ||
                orderTotal <= 0 ||
                !Number.isFinite(orderTotal)
            ) {
                return res.status(400).json({ error: "Invalid order total" });
            }

            // Save order to db
            const userId = req.user._id;
            const shippingAddress = {
                street: userData.street,
                city: userData.city,
                state: userData.state,
                zip: userData.zip,
            };
            const now = new Date();

            // Save payment order and order items to db
            const orderId = await saveOrderInfoToDb(
                itemsInfoFromDb,
                userId,
                orderTotal,
                shippingAddress,
                now,
                currTask,
            );

            // Convert to Stripe API format
            const preparedLineItems = prepareLineItems(itemsInfoFromDb, items);
            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                line_items: preparedLineItems,
                success_url: `${process.env.CLIENT_URL}/success?sessionId={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
                cancel_url: `${process.env.CLIENT_URL}/cart`,
            });
            const redirectUrl = session.url;

            // return checkout URL
            res.json({ url: redirectUrl });
        });
    } catch (err) {
        next(err);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function patchCompleteCheckout(req, res, next) {
    try {
        const { sessionId, orderId } = req.body;
        const userId = req.user._id;

        const result = await db.result(
            `
            UPDATE app_user_order
            SET
                stripe_payment_id = $<sessionId>,
                is_complete = TRUE
            WHERE order_id = $<orderId> AND
                  user_id = $<userId>
        `,
            { sessionId, orderId, userId },
        );

        // if no rows were returned, the order doesn't exist OR doesn't belong to this userId
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Order not found." });
        }

        res.status(200).json({ msg: "Payment successful" });
    } catch (err) {
        next(err);
    }
}
