/// <reference types="cypress" />

describe("user sign up", () => {
    it("should sign up a user as Bob Doe", () => {
        // Stubbed API req for user sign-up
        cy.intercept("POST", "/api/auth/sign-up", {
            statusCode: 201,
            body: {
                message: "New user created",
            },
        });

        cy.visit("/auth/sign-up");

        // get the env variable async
        cy.env(["testUserPassword"]).then(({ testUserPassword }) => {
            cy.get("#first-name").type("Bob");
            cy.get("#last-name").type("Doe");
            cy.get("#email").type("bobdoe@gmail.com");

            // Safe to type now that the value has yielded
            cy.get("#password").type(testUserPassword);

            cy.contains("button", "Submit").click();
            cy.url().should("include", "/log-in");
        });
    });
});
