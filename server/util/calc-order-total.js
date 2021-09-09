"use strict";

/**
 * 
 * @param {array} itemsArr - Array of item objects with a "price" field on each object 
 * @returns {number} - Total amount
 */
function calcOrderTotal(itemsArr) {
    return itemsArr.reduce((total, itemObj) => {
        const productTotal = itemObj.price * itemObj.productQuantity;

        return total + productTotal
    }, 0);
}

module.exports = { calcOrderTotal };