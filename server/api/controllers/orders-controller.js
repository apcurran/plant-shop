"use strict";

const jwt = require("jsonwebtoken");

const db = require("../../db/index");

async function postCreatePaymentIntent(req, res, next) {
    try {
        console.log(req.body);
        res.end();

    } catch (err) {
        next(err);
    }
}

module.exports = {
    postCreatePaymentIntent,
};