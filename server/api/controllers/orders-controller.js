"use strict";

const jwt = require("jsonwebtoken");

const db = require("../../db/index");

async function postCreatePaymentIntent(req, res, next) {
    const { currItemsArr, totalQty } = req.body;
    let itemsInfoFromDb = [];

    try {
        for (let itemObj of currItemsArr) {
            const prodId = Number(itemObj.productId);
            const productExtraInfoId = itemObj.productExtraInfoId;
            const itemInfo = (await db.query(`
                SELECT
                    product.title,
                    product_extra_info.size,
                    product_extra_info.price
                FROM product
                INNER JOIN
                    product_extra_info ON product.product_id = product_extra_info.product_id
                WHERE
                    product.product_id = $1
                    AND
                    product_extra_info.product_extra_info_id = $2
            `, [prodId, productExtraInfoId])).rows;

            itemsInfoFromDb.push(itemInfo);
        }

        console.log(itemsInfoFromDb);
        // NOTE: Data coming in correctly

    } catch (err) {
        next(err);
    }
}

module.exports = {
    postCreatePaymentIntent,
};