"use strict";

const db = require("../db/index");

async function saveOrderInfoToDb(itemsInfoFromDb, userId, paymentTotal, shippingAddress, currDate, next) {
    const client = await db.pool
                            .connect()
                            .catch((err) => next(err));

    try {
        // SQL Transaction
        await client.query("BEGIN");
        // Save order to app_user_order table (returning the order_id)
        var insertedOrderId = (await client.query(`
            INSERT INTO app_user_order
                (user_id, total_cost, street, city, state, zip, created_at)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7)
            RETURNING order_id
        `,
        [
            userId,
            paymentTotal,
            shippingAddress.street,
            shippingAddress.city,
            shippingAddress.state,
            shippingAddress.zip,
            currDate
        ])).rows[0].order_id;

        // Iterate through itemsInfoFromDb and save each obj data to app_user_order_item table
        for (let obj of itemsInfoFromDb) {
            await client.query(`
                INSERT INTO app_user_order_item
                    (order_id, product_id, product_extra_info_id)
                VALUES
                    ($1, $2, $3)
            `, [insertedOrderId, obj.productId, obj.productExtraInfoId]);
        }

        await client.query("COMMIT");

    } catch (err) {
        await client.query("ROLLBACK");

        next(err);
    } finally {
        client.release();

        return insertedOrderId;
    }
}

module.exports = { saveOrderInfoToDb };