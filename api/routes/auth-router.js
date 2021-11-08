"use strict";

const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth-controller");

router.post("/sign-up", authController.postSignup);

router.post("/log-in", authController.postLogin);

router.post("/forgot-password", authController.postForgot);

router.patch("/reset-password", authController.patchResetPassword);

module.exports = router;