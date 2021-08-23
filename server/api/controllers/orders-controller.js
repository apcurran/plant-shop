"use strict";

const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const { prepareLineItems } = require("../../util/prepare-line-items");

async function postCreatePaymentIntent(req, res, next) {
    const { currItemsArr, totalQty } = req.body;
    // console.log(currItemsArr);
    
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

        // NOTE: Data coming in correctly
        // Convert to Stripe API format
        const preparedLineItems = prepareLineItems(itemsInfoFromDb, currItemsArr);
        // console.log(preparedLineItems);
        

    } catch (err) {
        next(err);
    }
}

module.exports = {
    postCreatePaymentIntent,
};