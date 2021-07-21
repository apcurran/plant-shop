"use strict";

const express = require("express");

const productsController = require("../controllers/products-controller");
const { verifyAuth } = require("../middleware/verify-auth");
const { verifyAdmin } = require("../middleware/verify-admin");

const router = express.Router();

// GET products by category
router.get("/category", productsController.getProductsByCategory);
// GET specific product
router.get("/:productId", productsController.getProduct);
// PATCH specific product
router.patch("/:productId", productsController.patchProduct);
// DELETE specific product
router.delete("/:productId", verifyAdmin, productsController.deleteProduct);
// GET all products
router.get("/", productsController.getProducts);
// POST new product
router.post("/", verifyAdmin, productsController.postProduct);


module.exports = router;
