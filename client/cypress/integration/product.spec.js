/// <reference types="cypress" />

describe("product page", () => {
    beforeEach(() => {
        cy.visit("/collections/4");
    });

    it("should update cart icon total qty when a product is added to the cart", () => {
        cy.contains("button", "1 gallon")
          .click();
    });
});