/**
 *
 * @param {array} itemsArr - Array of item objects with a "price" field on each object
 * @returns {number} - Total amount
 */
export function calcOrderTotal(itemsArr) {
    return itemsArr.reduce((total, itemObj) => {
        const productTotal = itemObj.price * itemObj.productQuantity;

        return total + productTotal;
    }, 0);
}
