import express from "express";

import * as ordersController from "../controllers/orders-controller.js";
import { verifyAuth } from "../middleware/verify-auth.js";

const router = express.Router();

router.get("/order-history", verifyAuth, ordersController.getOrderHistory);
router.post(
    "/create-checkout-session",
    verifyAuth,
    ordersController.postCreateCheckoutSession,
);
router.patch(
    "/complete-checkout",
    verifyAuth,
    ordersController.patchCompleteCheckout,
);

export default router;
