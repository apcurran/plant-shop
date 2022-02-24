/// <reference types="cypress" />

describe("order history", () => {
    beforeEach(() => {
        sessionStorage.clear();

        cy.visit("/auth/log-in");

        cy.get("#email")
            .type("bobdoe@gmail.com");

        cy.get("#password")
            .type(Cypress.env("password"));

        cy.contains("button", /submit/i)
            .click();
    });

    it("should display an order with 1 oak tree, 2 ash trees, and one pear tree", () => {
        cy.contains("a", "Your Orders")
            .click();

        // Order date
        cy.contains("February 24, 2022").should("be.visible");

        cy.get(".order-item")
            .contains("The Oak Tree");

        cy.get(".order-item")
            .contains("The Ash Tree");

        cy.get(".order-item")
            .contains("The Pear Tree");

        cy.get(".order-item__content__qty")
            .contains(1);

        cy.get(".order-item__content__qty")
            .contains(2);

        cy.get(".order-item__content__qty")
            .contains(1);
    });
});