/// <reference types="cypress" />

describe("user sign up", () => {
    it("should sign up a user as Bob Doe", () => {
        cy.visit("/auth/sign-up");
        // Stubbed API req for user sign-up
        cy.intercept("POST", "/api/auth/sign-up", {
            statusCode: 201,
            body: {
                message: "New user created"
            }
        });

        cy.get("#first-name")
            .type("Bob");

        cy.get("#last-name")
            .type("Doe");

        cy.get("#email")
            .type("bobdoe@gmail.com");

        cy.get("#password")
            .type(Cypress.env("password"));

        cy.contains("button", "Submit")
            .click();

        cy.url().should("include", "/log-in");
    });
});