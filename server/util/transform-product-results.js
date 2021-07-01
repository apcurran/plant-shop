"use strict";

/**
 * 
 * @param {object[]} rowsArr - Array of objects representing the db query's resulting rows. 
 * @returns {{
 *              title: string,
 *              description: string,
 *              category: string,
 *              url: string,
 *              altText: string,
 *              width: number,
 *              height: number,
 *              productExtraInfo: Array
 *          }} - Returning formatted obj with product info.
 */
function transformProductResults(rowsArr) {
    const primaryProductData = rowsArr[0];
    const prodInfoArr = rowsArr.map((obj) => {
        return {
            productExtraInfoId: obj.productExtraInfoId,
            size: obj.size,
            price: obj.price
        };
    });
    
    return {
        title: primaryProductData.title,
        description: primaryProductData.description,
        category: primaryProductData.category,
        url: primaryProductData.url,
        altText: primaryProductData.altText,
        width: primaryProductData.width,
        height: primaryProductData.height,
        productExtraInfo: prodInfoArr
    };
}

module.exports = { transformProductResults };