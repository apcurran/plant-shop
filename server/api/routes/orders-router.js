"use strict";

const express = require("express");

const ordersController = require("../controllers/orders-controller");
const { verifyAuth } = require("../middleware/verify-auth");

const router = express.Router();

router.get("/order-history/:userId", verifyAuth, ordersController.getOrderHistory);

router.post("/create-checkout-session", verifyAuth, ordersController.postCreatePaymentIntent);

router.patch("/complete-checkout", verifyAuth, ordersController.patchCompleteCheckout);

module.exports = router;