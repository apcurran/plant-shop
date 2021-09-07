"use strict";

const express = require("express");

const ordersController = require("../controllers/orders-controller");
const { verifyAuth } = require("../middleware/verify-auth");

const router = express.Router();

router.post("/create-checkout-session", verifyAuth, ordersController.postCreatePaymentIntent);

router.post("/complete-checkout", verifyAuth, ordersController.postCompleteCheckout);

module.exports = router;