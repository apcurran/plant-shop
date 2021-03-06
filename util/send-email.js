"use strict";

require("dotenv").config();

const nodemailer = require("nodemailer");

async function sendResetLink(id, userEmail) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USERNAME,
                pass: process.env.ETHEREAL_PW
            }
        });
    
        const message = await transporter.sendMail({
            from: `Evergreen Plant Shop ${process.env.ETHEREAL_USERNAME}`,
            to: userEmail,
            subject: "Password Reset",
            text: "Password Reset Link",
            html: `
                <p>To reset your password, please click on this link: <a href="${process.env.CLIENT_URL}/auth/reset-password/${id}">Reset Password</a></p>
            `
        });
    
        console.log("Message sent: %s", message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
        
    } catch (err) {
        console.error(err);
    }
}

module.exports = { sendResetLink };