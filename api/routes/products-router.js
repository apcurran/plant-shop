import express from "express";
import multer from "multer";

import * as productsController from "../controllers/products-controller.js";
import { verifyAdmin } from "../middleware/verify-admin.js";

const router = express.Router();

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
];

const fileUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MiB
    },
    fileFilter(req, file, cb) {
        if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG, PNG, WebP, and AVIF images are allowed."));
        }
    },
});

// GET products by category
router.get("/category", productsController.getProductsByCategory);
// GET specific product
router.get("/:productId", productsController.getProduct);
// PATCH specific product
router.patch(
    "/:productId",
    verifyAdmin,
    fileUpload.single("productImg"),
    productsController.patchProduct,
);
// DELETE specific product
router.delete("/:productId", verifyAdmin, productsController.deleteProduct);
// GET all products
router.get("/", productsController.getProducts);
// POST new product
router.post(
    "/",
    verifyAdmin,
    fileUpload.single("productImg"),
    productsController.postProduct,
);

export default router;
