"use strict";

const express = require("express");

const ordersController = require("../controllers/orders-controller");
const { verifyAuth } = require("../middleware/verify-auth");

const router = express.Router();

router.post("/create-checkout-session", verifyAuth, ordersController.postCreatePaymentIntent);

router.patch("/complete-checkout", verifyAuth, ordersController.patchCompleteCheckout);

module.exports = router;