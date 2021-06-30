"use strict";

const express = require("express");

const productsController = require("../controllers/products-controller");

const router = express.Router();

// GET products by category
router.get("/category", productsController.getProductsByCategory);
// GET specific product
router.get("/:productId", productsController.getProduct);
// GET all products
router.get("/", productsController.getProducts);

// POST new product
router.post("/", productsController.postProduct);

module.exports = router;
