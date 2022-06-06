"use strict";

const { db } = require("../../db/index");
const pgp = db.$config.pgp;
const { postProductValidation, patchProductValidation } = require("../validation/products-validation");
const { streamUploadToCloudinary } = require("../../util/stream-upload-to-cloudinary");

async function getProducts(req, res, next) {
    try {
        const products = await db.many(`
            SELECT
                product.product_id AS "productId",
                product.title,
                product.category,

                product_img.public_id AS "publicId",
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
        `);

        res.status(200).json(products);

    } catch (err) {
        next(err);
    }
}

async function getProduct(req, res, next) {
    try {
        const { productId } = req.params;
        const queries = [
            {
                query: `
                    SELECT
                        product.title,
                        product.description,
                        product.category,

                        product_img.public_id AS "publicId",
                        product_img.alt_text AS "altText",
                        product_img.width,
                        product_img.height
                    FROM product
                    INNER JOIN product_img
                        ON product.product_id = product_img.product_id
                    WHERE product.product_id = $<productId>
                `,
                values: { productId }
            },
            {
                query: `
                    SELECT
                        product_extra_info.product_extra_info_id AS "productExtraInfoId",
                        product_extra_info.size,
                        product_extra_info.price
                    FROM product_extra_info
                    WHERE product_extra_info.product_id = $<productId>
                `,
                values: { productId }
            }
        ];
        const formattedQueries = pgp.helpers.concat(queries);
        const [primaryProductDataArr, productExtraInfoArr] = await db.multi(formattedQueries);
        const finalFormattedProduct = {
            ...primaryProductDataArr[0],
            productExtraInfo: productExtraInfoArr
        };

        res.status(200).json(finalFormattedProduct);

    } catch (err) {
        next(err);
    }
}

async function getProductsByCategory(req, res, next) {
    try {
        const { q } = req.query;
        const products = await db.manyOrNone(`
            SELECT
                product.product_id AS "productId",
                product.title,
                product.category,

                product_img.public_id AS "publicId",
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
            WHERE product.category = $<q>
        `,
            { q });

        res.status(200).json(products);

    } catch (err) {
        next(err);
    }
}

async function postProduct(req, res, next) {
    const imgFile = req.file;
    const uploadedProductImgData = await streamUploadToCloudinary(imgFile, "evergreen-app")
                                            .catch((err) => next(err));
    const productImgPublicId = uploadedProductImgData.public_id;
    const productImgWidth = uploadedProductImgData.width;
    const productImgHeight = uploadedProductImgData.height;
    try {
        // Function-scoped vars
        var {
            title,
            description,
            category,
            imgAltText
        } = await postProductValidation(req.body);
        
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.message });
        }

        next(err);
    }

    /** @type {object[]} */
    const productExtraInfo = JSON.parse(req.body.productExtraInfo);

    try {
        // db.tx() method already adds BEGIN, COMMIT, and ROLLBACK for postgres transaction
        await db.tx("add-product-transaction", async (currTx) => {
            // Save to product table (returning the product_id)
            const insertedProductId = (await currTx.one(
                `
                INSERT INTO product
                    (title, description, category)
                VALUES
                    ($<title>, $<description>, $<category>)
                RETURNING product_id
                `,
                { title, description, category }
            )).product_id;
            // Iterate productExtraInfo and save each obj's data to product_extra_info table (save product_id as FK)
            for (let { size, price } of productExtraInfo) {
                await currTx.none(
                    `
                    INSERT INTO product_extra_info
                        (product_id, size, price)
                    VALUES
                        ($<insertedProductId>, $<size>, $<price>)
                    `,
                    { insertedProductId, size, price }
                );
            }
            // Save to product_img table (save product_id as FK)
            await currTx.none(
                `
                INSERT INTO product_img
                    (product_id, alt_text, width, height, public_id)
                VALUES
                    ($<insertedProductId>, $<imgAltText>, $<productImgWidth>, $<productImgHeight>, $<productImgPublicId>)
                `,
                { insertedProductId, imgAltText, productImgWidth, productImgHeight, productImgPublicId }
            );
        });

    } catch (err) {
        next(err);
    }

    res.status(201).json({ msg: "Product information added." });
}

async function patchProduct(req, res, next) {
    const { productId } = req.params;
    const imgFile = req.file ? req.file : null;
    const uploadedProductImgData = imgFile ? await streamUploadToCloudinary(imgFile, "evergreen-app").catch((err) => next(err)) : null;
    const productImgPublicId = uploadedProductImgData ? uploadedProductImgData.public_id : null;
    const productImgWidth = uploadedProductImgData ? uploadedProductImgData.width : null;
    const productImgHeight = uploadedProductImgData ? uploadedProductImgData.height : null;
    try {
        // Function-scoped vars
        var {
            title,
            description,
            category,
            imgAltText
        } = await patchProductValidation(req.body);
        
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.message });
        }

        next(err);
    }
    /** @type {object[]} */
    const productExtraInfo = JSON.parse(req.body.productExtraInfo);

    const client = await db.pool
                            .connect()
                            .catch((err) => next(err));

    try {
        // SQL Transaction
        await client.query("BEGIN");
        await client.query(
            `
            UPDATE product
            SET
                title = COALESCE($1, title),
                description = COALESCE($2, description),
                category = COALESCE($3, category)
            WHERE product.product_id = $4
            `,
            [title, description, category, productId]
        );

        for (let obj of productExtraInfo) {
            await client.query(
                `
                UPDATE product_extra_info
                SET
                    size = COALESCE($1, size),
                    price = COALESCE($2, price)
                WHERE
                    product_extra_info.product_id = $3
                    AND
                    product_extra_info.product_extra_info_id = $4
                `,
                [obj.size, obj.price, productId, obj.productExtraInfoId]
            );
        }

        await client.query(
            `
            UPDATE product_img
            SET
                alt_text = COALESCE($1, alt_text),
                width = COALESCE($2, width),
                height = COALESCE($3, height),
                public_id = COALESCE($4, public_id)
            WHERE product_img.product_id = $5
            `,
            [imgAltText, productImgWidth, productImgHeight, productImgPublicId, productId]
        );
        await client.query("COMMIT");

    } catch (err) {
        await client.query("ROLLBACK");

        next(err);
    } finally {
        client.release();
    }

    res.status(200).json({ msg: "Product information updated." });
}

async function deleteProduct(req, res, next) {
    try {
        const { productId } = req.params;

        await db.none(
            `
            DELETE FROM product
            WHERE product.product_id = $<productId>
            `,
            { productId }
        );

        res.status(200).json({ msg: "Product removed." });

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
    deleteProduct
};