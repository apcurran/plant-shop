"use strict";

const db = require("../../db/index");

async function getProducts(req, res, next) {
    try {
        const products = (await db.query(`
            SELECT
                product.product_id,
                product.title,
                product.category,

                product_img.url,
                product_img.alt_text,
                product_img.width,
                product_img.height,

                product_extra_info.price
            FROM product
            INNER JOIN product_img
                ON product.product_id = product_img.product_id
            INNER JOIN product_extra_info
                ON product.product_id = product_extra_info.product_id
                AND product_extra_info.size = 1
            ORDER BY product.category
        `)).rows;
        console.log(products);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getProducts,
};