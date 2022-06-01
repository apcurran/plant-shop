"use strict";

require("dotenv").config();

const pgp = require("pg-promise")({ capSQL: true });

const db = pgp({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = { db };