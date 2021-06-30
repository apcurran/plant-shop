"use strict";

const { transformProductResults } = require("./transform-product-results");

test("formats initial product data array into a single JSON-style object with product information", () => {
    const exampleProdData = [
        {
            "title": "The Fiddle Leaf Fig",
            "description": "Suspendisse ut placerat ante. Pellentesque at purus vitae nisl pulvinar sagittis et eget eros. Phasellus mattis iaculis elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor dolor id eros finibus, vitae volutpat justo accumsan. Etiam mattis, lacus quis eleifend porta, dolor velit viverra neque, nec venenatis felis quam in massa. Praesent congue in augue eu lobortis. Maecenas lorem mauris, mollis nec volutpat vel, consequat id dui.",
            "category": "House Plants",
            "url": "https://res.cloudinary.com/dev-project/image/upload/v1624984820/evergreen-app/house-plant-fiddle-leaf-fig--lg_mydbg7.jpg",
            "altText": "Fiddle Leaf Fig plant in a white container.",
            "width": 1920,
            "height": 2880,
            "size": 1,
            "price": "25.00"
        },
        {
            "title": "The Fiddle Leaf Fig",
            "description": "Suspendisse ut placerat ante. Pellentesque at purus vitae nisl pulvinar sagittis et eget eros. Phasellus mattis iaculis elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor dolor id eros finibus, vitae volutpat justo accumsan. Etiam mattis, lacus quis eleifend porta, dolor velit viverra neque, nec venenatis felis quam in massa. Praesent congue in augue eu lobortis. Maecenas lorem mauris, mollis nec volutpat vel, consequat id dui.",
            "category": "House Plants",
            "url": "https://res.cloudinary.com/dev-project/image/upload/v1624984820/evergreen-app/house-plant-fiddle-leaf-fig--lg_mydbg7.jpg",
            "altText": "Fiddle Leaf Fig plant in a white container.",
            "width": 1920,
            "height": 2880,
            "size": 2,
            "price": "30.00"
        }
    ];
    const expectedFormattedDataObj = {
        "title": "The Fiddle Leaf Fig",
        "description": "Suspendisse ut placerat ante. Pellentesque at purus vitae nisl pulvinar sagittis et eget eros. Phasellus mattis iaculis elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor dolor id eros finibus, vitae volutpat justo accumsan. Etiam mattis, lacus quis eleifend porta, dolor velit viverra neque, nec venenatis felis quam in massa. Praesent congue in augue eu lobortis. Maecenas lorem mauris, mollis nec volutpat vel, consequat id dui.",
        "category": "House Plants",
        "url": "https://res.cloudinary.com/dev-project/image/upload/v1624984820/evergreen-app/house-plant-fiddle-leaf-fig--lg_mydbg7.jpg",
        "altText": "Fiddle Leaf Fig plant in a white container.",
        "width": 1920,
        "height": 2880,
        "productExtraInfo": [
            {
                "size": 1,
                "price": "25.00"
            },
            {
                "size": 2,
                "price": "30.00"
            }
        ]
    };

    expect(transformProductResults(exampleProdData)).toEqual(expectedFormattedDataObj);
});