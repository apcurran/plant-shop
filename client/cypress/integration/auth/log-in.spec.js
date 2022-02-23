/// <reference types="cypress" />

describe("log in flow", () => {
    it("should log in user as John Doe", () => {
        cy.visit("/auth/log-in");

        cy.get("#email")
            .type("johndoe@gmail.com");

        cy.get("#password")
            .type("password");

        cy.contains("button", /submit/i)
            .click();

        cy.contains("header", /hello, john/i)
            .should("be.visible");
    });
});