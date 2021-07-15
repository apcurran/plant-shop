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
        const {
            firstName,
            lastName,
            email,
            password,
            adminPassword
        } = req.body;
        // Reject if there is already an existing user with the same email
        const emailExists = (await db.query(`
            SELECT app_user.user_id
            FROM app_user
            WHERE app_user.email = $1
        `,  [email])).rows;

        if (emailExists.length > 0) {
            return res.status(400).json({ error: "Email already exists." });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Is this new user an admin?
        const isAdmin = adminPassword === process.env.ADMIN_PW ? true : false;

        // Add new user to db
        await db.query(`
            INSERT INTO app_user
                (first_name, last_name, email, password, is_admin)
            VALUES
                ($1, $2, $3, $4, $5)
        `,  [firstName, lastName, email, hashedPassword, isAdmin]);

        res.status(201).json({ message: "New user created." });

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