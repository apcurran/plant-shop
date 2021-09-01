"use strict";

const db = require("../db/index");

async function saveOrderInfoToDb(itemsInfoFromDb, userId, paymentId, paymentTotal, shippingAddress, currDate, next) {
    const client = await db.pool
                            .connect()
                            .catch((err) => next(err));

    try {
        // SQL Transaction
        await client.query("BEGIN");
        // Save order to app_user_order table (returning the order_id)
        const insertedOrderId = await client.query(`
            INSERT INTO app_user_order
                (user_id, stripe_payment_id, total_cost, street, city, state, zip, created_at)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING order_id
        `,
        [
            userId,
            paymentId,
            paymentTotal,
            shippingAddress.street,
            shippingAddress.city,
            shippingAddress.state,
            shippingAddress.zip,
            currDate
        ]);

        // Iterate through itemsInfoFromDb and save each obj data to app_user_order_item table
        for (let obj of itemsInfoFromDb) {
            await client.query(`
                
            `, [])
        }

    } catch (err) {
        next(err);
    }
}

module.exports = { saveOrderInfoToDb };