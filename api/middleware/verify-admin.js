"use strict";

const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access denied." });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error(err);

            return res.status(403).json({ error: "Invalid token." });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ error: "Unauthorized access." });
        }

        // Validation passed
        req.user = user;
        next();
    });
}

module.exports = { verifyAdmin };