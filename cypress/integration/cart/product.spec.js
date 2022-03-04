/// <reference types="cypress" />

describe("product page", () => {
    beforeEach(() => {
        cy.visit("/collections/4");
    });

    it("should update cart icon total qty when a product is added to the cart", () => {
        cy.contains("button", "1 gallon")
          .click();

        cy.contains("button", /add to cart/i)
          .click();

        cy.get(".nav__cart-btn__item-qty")
          .should("not.have.text", "0")
          .should("have.text", "1");
    });
});