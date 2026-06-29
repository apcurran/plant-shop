/**
 * @param {array} itemsArr - Array of item objects with a "price" field on each object
 * @returns {number} - Total amount
 * @throws {Error} - If validation fails
 */
export function calcOrderTotal(itemsArr) {
    // Validate input array
    if (!Array.isArray(itemsArr) || itemsArr.length === 0) {
        throw new Error("Invalid items array");
    }

    return itemsArr.reduce((total, itemObj) => {
        // Validate price is positive number
        if (typeof itemObj.price !== "number" || itemObj.price <= 0) {
            throw new Error("Invalid price: must be positive number");
        }

        // Validate quantity is positive integer
        if (
            !Number.isInteger(itemObj.productQuantity) ||
            itemObj.productQuantity <= 0
        ) {
            throw new Error("Invalid quantity: must be positive integer");
        }

        const productTotal = itemObj.price * itemObj.productQuantity;

        return total + productTotal;
    }, 0);
}
