"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../../db/index");

// POST controllers
async function postSignup(req, res, next) {
    // TODO: Validate incoming data first

    try {
        
    } catch (err) {
        next(err);
    }
}

async function postLogin(req, res, next) {
    try {
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    postSignup,
    postLogin
};