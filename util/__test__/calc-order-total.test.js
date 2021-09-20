"use strict";

const { calcOrderTotal } = require("../calc-order-total");

describe("calcOrderTotal", () => {
    test("calculates order total from items array", () => {
        const sampleItemsArr = [
            {
                productId: 1,
                productExtraInfoId: 2,
                title: "The Pothos Plant",
                size: 2,
                price: 15,
                productQuantity: 1
            },
            {
                productId: 2,
                productExtraInfoId: 3,
                title: "The Succulent Medley",
                size: 3,
                price: 25,
                productQuantity: 2
            }
        ];
    
        expect(calcOrderTotal(sampleItemsArr)).toBe(65);
    });
});