import { db } from "../../db/index.js";
import {
    postProductValidation,
    patchProductValidation,
} from "../validation/products-validation.js";
import { streamUploadToCloudinary } from "../../util/stream-upload-to-cloudinary.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function getProducts(req, res, next) {
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

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function getProduct(req, res, next) {
    try {
        const { productId } = req.params;
        const product = await db.oneOrNone(
            `
            SELECT
                product.title,
                product.description,
                product.category,

                product_img.public_id AS "publicId",
                product_img.alt_text AS "altText",
                product_img.width,
                product_img.height,

                COALESCE(
                    (
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'productExtraInfoId', pei.product_extra_info_id,
                                'size', pei.size,
                                'price', pei.price
                            )
                        )
                        FROM product_extra_info AS pei
                        WHERE pei.product_id = product.product_id
                    ),
                    '[]'::jsonb
                ) AS "productExtraInfo"

            FROM product
            INNER JOIN product_img
                ON product.product_id = product_img.product_id
            WHERE product.product_id = $<productId>
            `,
            { productId },
        );

        // handle product not found gracefully here
        if (!product) {
            return res.status(404).json({
                msg: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function getProductsByCategory(req, res, next) {
    try {
        const { q } = req.query;
        const products = await db.manyOrNone(
            `
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
            { q },
        );

        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function postProduct(req, res, next) {
    const imgFile = req.file;

    try {
        if (!imgFile) {
            return res
                .status(400)
                .json({ error: "Product image is required." });
        }

        // validate form fields data first
        const { title, description, category, imgAltText } =
            await postProductValidation(req.body);
        /** @type {{size: string, price: number}[]} */
        let productExtraInfo;

        try {
            productExtraInfo = JSON.parse(req.body.productExtraInfo);
        } catch {
            return res
                .status(400)
                .json({ error: "Invalid productExtraInfo format." });
        }

        if (!Array.isArray(productExtraInfo)) {
            return res
                .status(400)
                .json({ error: "productExtraInfo must be an array." });
        }

        // run Cloudinary upload
        const uploadedProductImgData = await streamUploadToCloudinary(
            imgFile,
            "evergreen-app",
        );
        const productImgPublicId = uploadedProductImgData.public_id;
        const productImgWidth = uploadedProductImgData.width;
        const productImgHeight = uploadedProductImgData.height;

        // db.tx() method already adds BEGIN, COMMIT, and ROLLBACK for postgres transaction
        await db.tx("add-product-transaction", async (currTx) => {
            // Save to product table (returning the product_id)
            const insertedProductId = (
                await currTx.one(
                    `
                INSERT INTO product
                    (title, description, category)
                VALUES
                    ($<title>, $<description>, $<category>)
                RETURNING product_id
                `,
                    { title, description, category },
                )
            ).product_id;
            // Iterate productExtraInfo and save each obj's data to product_extra_info table (save product_id as FK)
            for (let { size, price } of productExtraInfo) {
                await currTx.none(
                    `
                    INSERT INTO product_extra_info
                        (product_id, size, price)
                    VALUES
                        ($<insertedProductId>, $<size>, $<price>)
                    `,
                    { insertedProductId, size, price },
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
                {
                    insertedProductId,
                    imgAltText,
                    productImgWidth,
                    productImgHeight,
                    productImgPublicId,
                },
            );
        });
    } catch (err) {
        return next(err);
    }

    res.status(201).json({ msg: "Product information added." });
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function patchProduct(req, res, next) {
    const { productId } = req.params;
    const imgFile = req.file ?? null;

    let productExtraInfo;

    try {
        /** @type {object[]} */
        productExtraInfo = JSON.parse(req.body.productExtraInfo);
    } catch {
        return res
            .status(400)
            .json({ error: "Invalid productExtraInfo JSON." });
    }

    try {
        const { title, description, category, imgAltText } =
            await patchProductValidation(req.body);

        // only upload img after successful validation
        const uploadedProductImgData = imgFile
            ? await streamUploadToCloudinary(imgFile, "evergreen-app")
            : null;
        const productImgPublicId = uploadedProductImgData
            ? uploadedProductImgData.public_id
            : null;
        const productImgWidth = uploadedProductImgData
            ? uploadedProductImgData.width
            : null;
        const productImgHeight = uploadedProductImgData
            ? uploadedProductImgData.height
            : null;

        // SQL transaction
        await db.tx("update-product-transaction", async (currTx) => {
            const productResult = await currTx.result(
                `
                UPDATE product
                SET
                    title = COALESCE($<title>, title),
                    description = COALESCE($<description>, description),
                    category = COALESCE($<category>, category)
                WHERE product.product_id = $<productId>
                `,
                { title, description, category, productId },
            );

            if (productResult.rowCount === 0) {
                const err = new Error("Product not found.");
                err.status = 404;
                throw err;
            }

            for (let { size, price, productExtraInfoId } of productExtraInfo) {
                await currTx.none(
                    `
                    UPDATE product_extra_info
                    SET
                        size = COALESCE($<size>, size),
                        price = COALESCE($<price>, price)
                    WHERE
                        product_extra_info.product_id = $<productId>
                        AND
                        product_extra_info.product_extra_info_id = $<productExtraInfoId>
                    `,
                    { size, price, productId, productExtraInfoId },
                );
            }

            await currTx.none(
                `
                UPDATE product_img
                SET
                    alt_text = COALESCE($<imgAltText>, alt_text),
                    width = COALESCE($<productImgWidth>, width),
                    height = COALESCE($<productImgHeight>, height),
                    public_id = COALESCE($<productImgPublicId>, public_id)
                WHERE product_img.product_id = $<productId>
                `,
                {
                    imgAltText,
                    productImgWidth,
                    productImgHeight,
                    productImgPublicId,
                    productId,
                },
            );
        });
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ msg: "Product information updated." });
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function deleteProduct(req, res, next) {
    try {
        const { productId } = req.params;

        const deletionResult = await db.result(
            `
            DELETE FROM product
            WHERE product.product_id = $<productId>
            `,
            { productId },
        );

        if (deletionResult.rowCount === 0) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({ msg: "Product removed." });
    } catch (err) {
        next(err);
    }
}
