import pgPromise from "pg-promise";

const pgp = pgPromise({ capSQL: true });

export const db = pgp({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
