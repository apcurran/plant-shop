"use strict";

require("dotenv").config();

const express = require("express");
const path = require("path");
const shrinkRay = require("shrink-ray-current");
const rateLimit = require("express-rate-limit");
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
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(shrinkRay());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

// Rate-limiting setup
const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 7,
    message: JSON.stringify({ error: "Too many requests, please try again in a minute." }),
    legacyHeaders: false
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
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode, and listening on port ${PORT}.`));
