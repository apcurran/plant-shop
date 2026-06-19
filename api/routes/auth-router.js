import express from "express";

import * as authController from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/sign-up", authController.postSignup);
router.post("/log-in", authController.postLogin);
router.post("/forgot-password", authController.postForgot);
router.patch("/reset-password", authController.patchResetPassword);

export default router;
