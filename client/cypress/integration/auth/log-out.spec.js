/// <reference types="cypress" />

describe("user log out", () => {
    it("should log out John Doe user", () => {
        cy.visit("/auth/log-in");

        cy.get("#email")
            .type("johndoe@gmail.com");

        cy.get("#password")
            .type("password");

        cy.contains("button", /submit/i)
            .click();

        // User now logged in

        cy.contains("button", /log out/i)
            .click();

        cy.url()
            .should("eq", "http://localhost:3000/");
    });
});