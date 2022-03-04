/// <reference types="cypress" />

describe("user log out", () => {
    it("should log out Bob Doe user", () => {
        cy.login();

        cy.contains("button", /log out/i)
            .click();

        cy.url()
            .should("eq", "http://localhost:3000/");
    });
});