"use strict";

const express = require("express");
const path = require("path");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");

const PORT = process.env.PORT || 5000;
// Import routers
const productsRouter = require("./api/routes/products-router");
const authRouter = require("./api/routes/auth-router");
const ordersRouter = require("./api/routes/orders-router");

const app = express();

if (process.env.NODE_ENV === "development") {
    const morgan = require("morgan");

    app.use(morgan("dev"));
}

// reduce fingerprinting
app.disable("x-powered-by");

// Middleware
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'"],
                // Allow images from self, data URIs, and Cloudinary
                "img-src": ["'self'", "data:", "https://res.cloudinary.com"],
                // Allow media vids
                "media-src": ["'self'", "https://res.cloudinary.com", "blob:"],
                // Allow scripts from your own domain (React's build files)
                "script-src": ["'self'", "'unsafe-inline'"],
                // enable Google Fonts to load for React client
                "style-src": [
                    "'self'",
                    "'unsafe-inline'",
                    "https://fonts.googleapis.com",
                ],
                "font-src": ["'self'", "https://fonts.gstatic.com"],
                // Connect-src must allow your API and Cloudinary if using their SDK
                "connect-src": ["'self'", "https://res.cloudinary.com"],
                "upgrade-insecure-requests": [],
            },
        },
        crossOriginResourcePolicy: {
            policy: "cross-origin",
        },
        crossOriginEmbedderPolicy: false,
    }),
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

// Rate-limiting setup
const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: JSON.stringify({
        error: "Too many requests, please try again in a minute.",
    }),
});

// API routers
app.use("/api/products", productsRouter);
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/orders", ordersRouter);

// General server error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);

    return res.status(500).json({ error: err.message });
});

// Catch-all GET handler to send back React's index.html file
app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode, and listening on port ${PORT}.`,
    ),
);
