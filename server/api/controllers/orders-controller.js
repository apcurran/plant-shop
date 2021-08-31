"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const db = require("../../db/index");
const { prepareLineItems } = require("../../util/prepare-line-items");

async function postCreatePaymentIntent(req, res, next) {
    console.log(req.user);
    const {
        street,
        city,
        state,
        zip
    } = req.body.userData;
    const { currItemsArr } = req.body.cartData;
    console.log(currItemsArr);
    
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

            itemsInfoFromDb.push(itemInfo);
        }

        // Convert to Stripe API format
        const preparedLineItems = prepareLineItems(itemsInfoFromDb, currItemsArr);
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: preparedLineItems,
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`
        });
        console.log(session);
        const paymentTotal = session.amount_total;

        res.json({ url: session.url });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    postCreatePaymentIntent,
};