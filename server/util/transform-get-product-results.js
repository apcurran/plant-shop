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
 *          }} - Returning obj with product info.
 */
function transformGetProductResults(rowsArr) {
    
}

module.exports = { transformGetProductResults };