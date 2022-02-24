/// <reference types="cypress" />

describe("user log out", () => {
    it("should log out Bob Doe user", () => {
        cy.visit("/auth/log-in");

        cy.get("#email")
            .type("bobdoe@gmail.com");

        cy.get("#password")
            .type(Cypress.env("password"));

        cy.contains("button", /submit/i)
            .click();

        // User now logged in

        cy.contains("button", /log out/i)
            .click();

        cy.url()
            .should("eq", "http://localhost:3000/");
    });
});