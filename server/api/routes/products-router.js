"use strict";

const express = require("express");

const productsController = require("../controllers/products-controller");

const router = express.Router();

// GET specific product
router.get("/:productId", productsController.getProducts);
// GET all products
router.get("/", productsController.getProducts);

module.exports = router;
