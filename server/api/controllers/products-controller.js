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
                product_img.height
            FROM product
            INNER JOIN product_img
                ON product.product_id = product_img.product_id
            ORDER BY product.category
        `)).rows;

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getProducts,
};