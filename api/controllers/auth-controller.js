import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

import { db } from "../../db/index.js";
import {
    signupValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
} from "../validation/auth-validation.js";
import { sendResetLink } from "../../util/send-email.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function postSignup(req, res, next) {
    try {
        const { firstName, lastName, email, password, adminPassword } =
            await signupValidation(req.body);

        // Reject if there is already an existing user with the same email
        const emailExists = await db.oneOrNone(
            `
                SELECT app_user.user_id
                FROM app_user
                WHERE app_user.email = $<email>
            `,
            { email },
        );

        if (emailExists) {
            return res.status(400).json({ error: "Email already exists." });
        }
        // utilize pg-promise task to re-use db connection
        await db.task(async (currTask) => {
            // Hash password
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            // Is this new user an admin?
            const isAdmin =
                adminPassword === process.env.ADMIN_PW ? true : false;

            // Add new user to db
            await currTask.none(
                `
                INSERT INTO app_user
                    (first_name, last_name, email, password, is_admin)
                VALUES
                    ($<firstName>, $<lastName>, $<email>, $<hashedPassword>, $<isAdmin>)
            `,
                { firstName, lastName, email, hashedPassword, isAdmin },
            );

            res.status(201).json({ message: "New user created." });
        });
    } catch (err) {
        next(err);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function postLogin(req, res, next) {
    try {
        const { email, password } = await loginValidation(req.body);
        const user = await db.oneOrNone(
            `
            SELECT
                user_id AS "userId",
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                password,
                is_admin AS "isAdmin"
            FROM app_user
            WHERE app_user.email = $<email>
        `,
            { email },
        );

        if (!user) {
            return res.status(400).json({ error: "Email is not found." });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                error: "Invalid credentials provided. Check your email or password again.",
            });
        }

        const token = jwt.sign(
            {
                _id: user.userId,
                firstName: user.firstName,
                isAdmin: user.isAdmin,
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1h",
            },
        );

        const baseUserInfo = {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        res.status(200).json({ accessToken: token, userInfo: baseUserInfo });
    } catch (err) {
        next(err);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function postForgot(req, res, next) {
    try {
        // Validate incoming data first
        const { email } = await forgotPasswordValidation(req.body);

        await db.task(async (currTask) => {
            // Get user from db
            const user = await currTask.oneOrNone(
                `
                SELECT first_name AS "firstName"
                FROM app_user
                WHERE app_user.email = $<email>
            `,
                { email },
            );

            if (user) {
                // Generate uuid
                const id = crypto.randomUUID();
                // Save in db table for forgotten passwords
                await currTask.none(
                    `
                    INSERT INTO app_user_password_requests
                        (temp_id, email)
                    VALUES
                        ($<id>, $<email>)
                `,
                    { id, email },
                );

                // Send reset link to user's email
                await sendResetLink(id, email);
            }

            // Return the same response message whether the user exists or not
            // this generic behavior helps to deter account enumeration
            res.status(200).json({
                message:
                    "If an account exists for that email, a password reset link has been sent.",
            });
        });
    } catch (err) {
        next(err);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function patchResetPassword(req, res, next) {
    try {
        // Get tempId from client req
        const { tempId, newPassword } = await resetPasswordValidation(req.body);
        const saltRounds = 12;
        const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const resetSuccess = await db.tx(async (currTransaction) => {
            // Consume the reset token. If no row is returned, the token is
            // invalid, expired, or has already been used.
            const userRequest = await currTransaction.oneOrNone(
                `
                DELETE FROM app_user_password_requests
                WHERE temp_id = $<tempId>
                RETURNING email
            `,
                { tempId },
            );

            if (!userRequest) {
                return false;
            }

            const userEmail = userRequest.email;

            // Update current user's pw in db table
            const result = await currTransaction.result(
                `
                UPDATE app_user
                SET password = $<newHashedPassword>
                WHERE email = $<userEmail>
            `,
                { newHashedPassword, userEmail },
            );

            // This should never happen unless the user was deleted after
            // requesting the password reset.
            if (result.rowCount !== 1) {
                throw new Error(
                    `Password reset failed: expected to update 1 user, updated ${result.rowCount}.`,
                );
            }

            return true;
        });

        if (!resetSuccess) {
            return res
                .status(400)
                .json({ error: "Invalid or expired reset link." });
        }

        res.status(200).json({
            message: "User password has been updated.",
        });
    } catch (err) {
        next(err);
    }
}
