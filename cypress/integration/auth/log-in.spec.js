/// <reference types="cypress" />

describe("log in flow", () => {
    beforeEach(() => {
        cy.visit("/auth/log-in");
        sessionStorage.clear();
    });

    it("should log in user as Bob Doe", () => {
        cy.get("#email")
            .type("bobdoe@gmail.com");

        cy.get("#password")
            .type(Cypress.env("password"));

        cy.contains("button", /submit/i)
            .click();

        cy.contains("header", /hello, bob/i)
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

    it("should give error message if user provides an email shorter than 6 characters long", () => {
        cy.get("#email")
            .type("bobdoe@gmail.com");

        cy.get("#password")
            .type("short");

        cy.contains("button", /submit/i)
            .click();

        cy.contains("p", /"password" length must be at least 6 characters long/i)
            .should("be.visible");
    });

    it("should give error message if user provides a password that is incorrect", () => {
        cy.get("#email")
            .type("bobdoe@gmail.com");

        cy.get("#password")
            .type("fakepassword");

        cy.contains("button", /submit/i)
            .click();

        cy.contains("p", /Invalid credentials provided. Check your email or password again./i)
            .should("be.visible");
    });
});