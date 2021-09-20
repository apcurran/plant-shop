"use strict";

/**
 * @param {array} cartItemsArr - Shopping cart items from client req
 * @param {array} itemsFromDbArr - Cart items secure data directly from db
 * @returns {array} - Prepped line items array ready for Stripe API use
 */
function prepareLineItems(itemsFromDbArr, cartItemsArr) {
    return itemsFromDbArr
            .map((item, itemIndex) => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.title
                        },
                        unit_amount: item.price * 100 // price in cents for Stripe API
                    },
                    quantity: cartItemsArr[itemIndex].itemQuantity
                };
            });
}

module.exports = { prepareLineItems };