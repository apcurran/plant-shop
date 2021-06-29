"use strict";

const express = require("express");

const productsController = require("../controllers/products-controller");

const router = express.Router();

// GET products by category
router.get("/", productsController.getProducts);

module.exports = router;
