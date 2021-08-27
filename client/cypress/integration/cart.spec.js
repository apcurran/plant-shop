/// <reference types="cypress" />

describe("cart functionality", () => {
    beforeEach(() => {
        cy.visit("/collections/4");

        sessionStorage.clear();

        cy.contains("button", "1 gallon")
          .click();

        cy.contains("button", /add to cart/i)
          .click();

        cy.visit("/cart");
    });

    it("product should be in cart table", () => {
        cy.contains("h2", /the pothos plant/i)
          .should("have.text", "The Pothos Plant");
    });
    
    it("product should contain a price of $15", () => {
        cy.get(".cart-table__price")
        .should("have.text", "$15");
    });
    
    it("product should contain a total of $15", () => {
        cy.get(".cart-table__total")
        .should("have.text", "$15");
    });
    
    it("product should have a qty of 1", () => {
        cy.get(".cart-table__qty-container span")
          .should("have.text", "1");
    });

    it("product qty should increment by 1 to make a total product qty of 2", () => {
        cy.contains("button", "+")
          .click();

        cy.get(".cart-table__qty-container span")
          .should("have.text", "2");
    });

    it("product qty starts from 2, then decrements to 1", () => {
        cy.contains("button", "+")
          .click();

        cy.get(".cart-table__qty-container span")
          .should("have.text", "2");

        cy.contains("button", "-")
          .click();

        cy.get(".cart-table__qty-container span")
          .should("have.text", "1");
    });

    it("decrementing product qty starting from 1 should delete the product entirely from the cart", () => {
        cy.contains("button", "-")
          .click();

        cy.contains("The Pothos Plant")
          .should("not.exist");
    });
});