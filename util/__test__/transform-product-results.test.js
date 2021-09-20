"use strict";

const { transformProductResults } = require("../transform-product-results");

describe("transformProductResults function", () => {
    xtest("formats initial product data array into a single JSON-style object with product information", () => {
        const exampleProdData = [
            {
                title: 'The Pothos Plant',
                description: 'Nunc blandit lacus eget metus porta, et egestas ligula blandit. Nunc diam est, laoreet et urna eu, interdum elementum est. In et leo eget mi egestas pretium. Etiam sollicitudin fringilla turpis, a porta erat faucibus nec. Nunc pharetra vitae ex sit amet mattis. Donec a pharetra arcu. Nam vitae lorem pellentesque, tempus magna id, convallis libero.',
                category: 'house plants',
                url: 'https://res.cloudinary.com/dev-project/image/upload/v1625071944/evergreen-app/house-plant-pothos--lg_lqnam1.jpg',
                altText: 'Potted pothos plant sitting on a suspended shelf.',
                width: 1920,
                height: 2400,
                productExtraInfoId: 6,
                publicId: 1,
                size: 1,
                price: '20.00'
            },
            {
                title: 'The Pothos Plant',
                description: 'Nunc blandit lacus eget metus porta, et egestas ligula blandit. Nunc diam est, laoreet et urna eu, interdum elementum est. In et leo eget mi egestas pretium. Etiam sollicitudin fringilla turpis, a porta erat faucibus nec. Nunc pharetra vitae ex sit amet mattis. Donec a pharetra arcu. Nam vitae lorem pellentesque, tempus magna id, convallis libero.',
                category: 'house plants',
                url: 'https://res.cloudinary.com/dev-project/image/upload/v1625071944/evergreen-app/house-plant-pothos--lg_lqnam1.jpg',
                altText: 'Potted pothos plant sitting on a suspended shelf.',
                width: 1920,
                height: 2400,
                productExtraInfoId: 7,
                publicId: 1,
                size: 2,
                price: '25.00'
            },
            {
                title: 'The Pothos Plant',
                description: 'Nunc blandit lacus eget metus porta, et egestas ligula blandit. Nunc diam est, laoreet et urna eu, interdum elementum est. In et leo eget mi egestas pretium. Etiam sollicitudin fringilla turpis, a porta erat faucibus nec. Nunc pharetra vitae ex sit amet mattis. Donec a pharetra arcu. Nam vitae lorem pellentesque, tempus magna id, convallis libero.',
                category: 'house plants',
                url: 'https://res.cloudinary.com/dev-project/image/upload/v1625071944/evergreen-app/house-plant-pothos--lg_lqnam1.jpg',
                altText: 'Potted pothos plant sitting on a suspended shelf.',
                width: 1920,
                height: 2400,
                productExtraInfoId: 8,
                publicId: 1,
                size: 4,
                price: '30.00'
            }
        ];
    
        const expectedFormattedDataObj = {
            "title": "The Pothos Plant",
            "description": "Nunc blandit lacus eget metus porta, et egestas ligula blandit. Nunc diam est, laoreet et urna eu, interdum elementum est. In et leo eget mi egestas pretium. Etiam sollicitudin fringilla turpis, a porta erat faucibus nec. Nunc pharetra vitae ex sit amet mattis. Donec a pharetra arcu. Nam vitae lorem pellentesque, tempus magna id, convallis libero.",
            "category": "house plants",
            "url": "https://res.cloudinary.com/dev-project/image/upload/v1625071944/evergreen-app/house-plant-pothos--lg_lqnam1.jpg",
            "altText": "Potted pothos plant sitting on a suspended shelf.",
            "width": 1920,
            "height": 2400,
            "productExtraInfo": [
                {
                    "productExtraInfoId": 6,
                    "size": 1,
                    "price": "20.00"
                },
                {
                    "productExtraInfoId": 7,
                    "size": 2,
                    "price": "25.00"
                },
                {
                    "productExtraInfoId": 8,
                    "size": 4,
                    "price": "30.00"
                }
            ]
        };
    
        expect(transformProductResults(exampleProdData)).toEqual(expectedFormattedDataObj);
    });
});