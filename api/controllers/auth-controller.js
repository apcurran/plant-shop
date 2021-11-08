"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const db = require("../../db/index");
const { signupValidation, loginValidation, forgotPasswordValidation } = require("../validation/auth-validation");

// POST controllers
async function postSignup(req, res, next) {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            adminPassword
        } = await signupValidation(req.body);
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
        // Check for JOI validation error first
        if (err.isJoi) {
            // Send back JOI validation error message
            return res.status(400).json({ error: err.message });
        }

        next(err);
    }
}

async function postLogin(req, res, next) {
    try {
        const { email, password } = await loginValidation(req.body);
        const user = (await db.query(`
            SELECT
                user_id AS "userId",
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                password,
                is_admin AS "isAdmin"
            FROM app_user
            WHERE app_user.email = $1
        `,  [email])).rows[0];

        if (!user) {
            return res.status(400).json({ error: "Email is not found." });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: "Invalid credentials provided. Check your email or password again." });
        }

        const token = jwt.sign(
            {
                _id: user.userId,
                firstName: user.firstName,
                isAdmin: user.isAdmin
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1h"
            }
        );

        const baseUserInfo = {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin
        };

        res.status(200).json({ accessToken: token, userInfo: baseUserInfo });

    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.message });
        }

        next(err);
    }
}

async function postForgot(req, res, next) {
    try {
        // Validate incoming data first
        const { email } = await forgotPasswordValidation(req.body);
        // Get user from db
        const user = (await db.query(`
            SELECT
                first_name AS "firstName"
            FROM app_user
            WHERE app_user.email = $1
        `, [email])).rows[0];

        // Reject if user does not exist in db
        if (!user) {
            return res.status(400).json({ error: "Email is not found." });
        }

        // Generate uuid
        const id = nanoid();
        // Save in db table for forgotten passwords

        // Send reset link to user's email

        // Return response with ok status

    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.message });
        }

        next(err);
    }
}

module.exports = {
    postSignup,
    postLogin,
    postForgot,
};