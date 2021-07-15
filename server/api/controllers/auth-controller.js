"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");
const { signupValidation, loginValidation } = require("../validation/auth-validation");

// POST controllers
async function postSignup(req, res, next) {
    // TODO: Validate incoming data first
    try {
        await signupValidation(req.body);

    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    try {
        
    } catch (err) {
        next(err);
    }
}

async function postLogin(req, res, next) {
    // TODO: Validate incoming data first
    try {
        await loginValidation(req.body);

    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    try {
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    postSignup,
    postLogin
};