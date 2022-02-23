/// <reference types="cypress" />

describe("user sign up", () => {
    it("should sign up a user as John Doe", () => {
        cy.visit("/auth/sign-up");
        // Stubbed API req for user sign-up
        cy.intercept("POST", "/api/auth/sign-up", {
            statusCode: 201,
            body: {
                message: "New user created"
            }
        });

        cy.get("#first-name")
            .type("John");

        cy.get("#last-name")
            .type("Doe");

        cy.get("#email")
            .type("johndoe@gmail.com");

        cy.get("#password")
            .type("password");

        cy.contains("button", "Submit")
            .click();

        cy.url().should("include", "/log-in");
    });
});