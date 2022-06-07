"use strict";

async function saveOrderInfoToDb(itemsInfoFromDb, userId, paymentTotal, shippingAddress, currDate, currTask, next) {
    try {
        // SQL Transaction
        const finishedOrderId = await currTask.tx("order-info-transaction", async (currTx) => {
            // Save order to app_user_order table (returning the order_id)
            const insertedOrderId = (await currTx.one(`
                INSERT INTO app_user_order
                    (user_id, total_cost, street, city, state, zip, created_at)
                VALUES
                    ($<userId>, $<paymentTotal>, $<street>, $<city>, $<state>, $<zip>, $<currDate>)
                RETURNING order_id
            `,
            {
                userId,
                paymentTotal,
                street: shippingAddress.street,
                city: shippingAddress.city,
                state: shippingAddress.state,
                zip: shippingAddress.zip,
                currDate
            })).order_id;
    
            // Iterate through itemsInfoFromDb and save each obj data to app_user_order_item table
            for (let { productId, productExtraInfoId, productQuantity } of itemsInfoFromDb) {
                await currTx.none(`
                    INSERT INTO app_user_order_item
                        (order_id, product_id, product_extra_info_id, product_qty)
                    VALUES
                        ($<insertedOrderId>, $<productId>, $<productExtraInfoId>, $<productQuantity>)
                `, { insertedOrderId, productId, productExtraInfoId, productQuantity });
            }

            return insertedOrderId;
        });

        return finishedOrderId;
        
    } catch (err) {
        next(err);
    }
}

module.exports = { saveOrderInfoToDb };