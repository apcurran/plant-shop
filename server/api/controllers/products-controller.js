"use strict";

const db = require("../../db/index");
const { transformProductResults } = require("../../util/transform-product-results");

async function getProducts(req, res, next) {
    try {
        const products = (await db.query(`
            SELECT
                product.product_id AS "productId",
                product.title,
                product.category,

                product_img.url,
                product_img.alt_text AS "altText",
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

async function getProductsByCategory(req, res, next) {
    try {
        const { q } = req.query;
        const products = (await db.query(`
            SELECT
                product.product_id AS "productId",
                product.title,
                product.category,

                product_img.url,
                product_img.alt_text AS "altText",
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
            WHERE product.category = $1
        `,
        [q])).rows;
        
        res.status(200).json(products);

    } catch (err) {
        next(err);
    }
}

async function postProduct(req, res, next) {
    const {
        title,
        description,
        category,
        productExtraInfo, // Array
        imgUrl,
        imgAltText,
        imgWidth,
        imgHeight
    } = req.body;

    // node-postgres requires the use of client instead of pool.query here
    const client = await db.pool.connect();

    try {
        // SQL Transaction
        await client.query("Begin");
        // Save to product table (returning the product_id)
        const insertedProductId = (await client.query(
            `
            INSERT INTO product
                (title, description, category)
            VALUES
                ($1, $2, $3)
            RETURNING product_id
            `,
            [title, description, category]
        )).rows[0].product_id;
        // Iterate productExtraInfo and save each obj data to product_extra_info table (save product_id as FK)
        for (let obj of productExtraInfo) {
            await client.query(
                `
                INSERT INTO product_extra_info
                    (product_id, size, price)
                VALUES
                    ($1, $2, $3)
                `,
                [insertedProductId, obj.size, obj.price]
            );
        }
        // Save to product_img table (save product_id as FK)
        await client.query(
            `
            INSERT INTO product_img
                (product_id, alt_text, width, height, url)
            VALUES
                ($1, $2, $3, $4, $5)
            `,
            [insertedProductId, imgAltText, imgWidth, imgHeight, imgUrl]
        );
        // Commit transaction to client
        await client.query("COMMIT");
        
    } catch (err) {
        await client.query("ROLLBACK");

        next(err);
    } finally {
        client.release();

        res.status(201).json({ msg: "Product information added." });
    }
}

async function patchProduct(req, res, next) {
    try {
        const { productId } = req.params;

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getProducts,
    getProduct,
    getProductsByCategory,
    postProduct,
    patchProduct,
};