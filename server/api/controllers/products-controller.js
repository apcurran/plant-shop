"use strict";

const db = require("../../db/index");
const { transformProductResults } = require("../../util/transform-product-results");

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
                -- The above AND operator allows the product_extra_info.price value to restrict to only the lowest price, based on size of the plant.
            ORDER BY product.category
        `)).rows;
        
        res.status(200).json(products);

    } catch (err) {
        next(err);
    }
}

async function getProduct(req, res, next) {
    try {
        const { productId } = req.params;
        const product = (await db.query(
            `
            SELECT
                product.title,
                product.description,
                product.category,

                product_img.url,
                product_img.alt_text AS "altText",
                product_img.width,
                product_img.height,

                product_extra_info.size,
                product_extra_info.price
            FROM product
            INNER JOIN product_img
                ON product.product_id = product_img.product_id
            INNER JOIN product_extra_info
                ON product.product_id = product_extra_info.product_id
            WHERE product.product_id = $1
            `,
            [productId]
        )).rows;
        
        const formattedProduct = transformProductResults(product);

        res.status(200).json(formattedProduct);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getProducts,
    getProduct,
};