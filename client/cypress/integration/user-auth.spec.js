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
});

describe("user log out", () => {
    beforeEach(() => {
        cy.visit("/auth/log-in");
    });

    it("should log out John Doe user", () => {
        cy.get("#email")
          .type("johndoe@gmail.com");

        cy.get("#password")
          .type("password");

        cy.contains("button", /submit/i)
          .click();

        // User now logged in

        cy.contains("button", /log out/i)
          .click();
    });
});

describe("user sign up", () => {
  // Mocked req to server API
  beforeEach(() => {
    cy.visit("/auth/sign-up");
  });

  it("should sign up a user as John Doe", () => {
    // Stubbed API req for user sign-up
    cy.intercept("POST", "/api/auth/sign-up", {
      statusCode: 201,
      body: {
        message: "New user created"
      }
    })

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
  });
})