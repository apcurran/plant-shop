"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const db = require("../../db/index");
const { prepareLineItems } = require("../../util/prepare-line-items");
const { saveOrderInfoToDb } = require("../../util/save-order-info-to-db");
const { calcOrderTotal } = require("../../util/calc-order-total");

async function postCreatePaymentIntent(req, res, next) {
    const { currItemsArr } = req.body.cartData;
    
    try {
        let itemsInfoFromDb = [];
        
        for (let itemObj of currItemsArr) {
            const prodId = Number(itemObj.productId);
            const productExtraInfoId = itemObj.productExtraInfoId;
            const itemInfo = (await db.query(`
                SELECT
                    product.title,
                    product_extra_info.size,
                    CAST(product_extra_info.price AS INTEGER)
                FROM product
                INNER JOIN
                    product_extra_info ON product.product_id = product_extra_info.product_id
                WHERE
                    product.product_id = $1
                    AND
                    product_extra_info.product_extra_info_id = $2
            `, [prodId, productExtraInfoId])).rows[0];

            const revisedItemInfo = {
                productId: prodId,
                productExtraInfoId,
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
        saveOrderInfoToDb(itemsInfoFromDb, userId, orderTotal, shippingAddress, now, next);

        // Convert to Stripe API format
        const preparedLineItems = prepareLineItems(itemsInfoFromDb, currItemsArr);
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: preparedLineItems,
            success_url: `${process.env.CLIENT_URL}/success?id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`
        });
        console.log(session);
        const redirectUrl = session.url;

        // Payment cancellation
        res.json({ url: redirectUrl });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    postCreatePaymentIntent,
};