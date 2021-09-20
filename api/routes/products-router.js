"use strict";

const express = require("express");
const multer = require("multer");

const productsController = require("../controllers/products-controller");
const { verifyAdmin } = require("../middleware/verify-admin");

const router = express.Router();
const fileUpload = multer();

// GET products by category
router.get("/category", productsController.getProductsByCategory);
// GET specific product
router.get("/:productId", productsController.getProduct);
// PATCH specific product
router.patch("/:productId", verifyAdmin, fileUpload.single("productImg"), productsController.patchProduct);
// DELETE specific product
router.delete("/:productId", verifyAdmin, productsController.deleteProduct);
// GET all products
router.get("/", productsController.getProducts);
// POST new product
router.post("/", verifyAdmin, fileUpload.single("productImg"), productsController.postProduct);


module.exports = router;
