"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const { db } = require("../../db/index");
const { signupValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation } = require("../validation/auth-validation");
const { sendResetLink } = require("../../util/send-email");

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

        // utilize pg-promise task to re-use db connection
        await db.task(async (currTask) => {
            // Reject if there is already an existing user with the same email
            const emailExists = await currTask.oneOrNone(`
                SELECT app_user.user_id
                FROM app_user
                WHERE app_user.email = $<email>
            `,  { email });
    
            if (emailExists) {
                return res.status(400).json({ error: "Email already exists." });
            }
    
            // Hash password
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            // Is this new user an admin?
            const isAdmin = adminPassword === process.env.ADMIN_PW ? true : false;
    
            // Add new user to db
            await currTask.none(`
                INSERT INTO app_user
                    (first_name, last_name, email, password, is_admin)
                VALUES
                    ($<firstName>, $<lastName>, $<email>, $<hashedPassword>, $<isAdmin>)
            `,  { firstName, lastName, email, hashedPassword, isAdmin });
    
            res.status(201).json({ message: "New user created." });
        });

    } catch (err) {
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
        const user = await db.oneOrNone(`
            SELECT
                user_id AS "userId",
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                password,
                is_admin AS "isAdmin"
            FROM app_user
            WHERE app_user.email = $<email>
        `,  { email });

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

        await db.task(async (currTask) => {
            // Get user from db
            const user = await currTask.oneOrNone(`
                SELECT
                    first_name AS "firstName"
                FROM app_user
                WHERE app_user.email = $<email>
            `, { email });
    
            // Reject if user does not exist in db
            if (!user) {
                return res.status(400).json({ error: "Email is not found." });
            }
    
            // Generate uuid
            const id = nanoid();
            // Save in db table for forgotten passwords
            await currTask.none(`
                INSERT INTO app_user_password_requests
                    (temp_id, email)
                VALUES
                    ($<id>, $<email>)
            `, { id, email });
    
            // Send reset link to user's email
            await sendResetLink(id, email);
    
            // Return response with ok status
            res.status(200).json({ message: "Email has been sent with your password reset link." });
        });

    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.message });
        }

        next(err);
    }
}

async function patchResetPassword(req, res, next) {
    try {
        // Get tempId from client req
        const { tempId, newPassword } = await resetPasswordValidation(req.body);
        // Get user info by tempId
        const userRequest = (await db.query(`
            SELECT
                email
            FROM app_user_password_requests
            WHERE temp_id = $1
        `, [tempId])).rows[0];
        const userEmail = userRequest.email;

        if (!userRequest) {
            return res.status(404).json({ error: "That account does not exist." });
        }

        const saltRounds = 12;
        const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
        
        // Update current user's pw in db table
        await db.query(`
            UPDATE app_user
            SET password = $1
            WHERE email = $2
        `, [newHashedPassword, userEmail]);

        res.status(200).json({ message: "User password has been updated." });

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
    patchResetPassword
};