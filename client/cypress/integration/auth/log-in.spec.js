/// <reference types="cypress" />

describe("log in flow", () => {
    beforeEach(() => {
        cy.visit("/auth/log-in");
    });

    it("should log in user as John Doe", () => {
        cy.get("#email")
            .type("johndoe@gmail.com");

        cy.get("#password")
            .type("password");

        cy.contains("button", /submit/i)
            .click();

        cy.contains("header", /hello, john/i)
            .should("be.visible");
    });

    it("should give error message if user email does not exist in db", () => {
        cy.get("#email")
            .type("fakeemail@gmail.com");

        cy.get("#password")
            .type("fakepassword");

        cy.contains("button", /submit/i)
            .click();

        cy.contains("p", /Email is not found/i)
            .should("be.visible");
    });
});