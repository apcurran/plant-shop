/// <reference types="cypress" />

describe("admin add new product", () => {
    beforeEach(() => {
        // cy.visit("/admin/auth/log-in");

        // cy.get("#email")
        //   .type("")
    });

    it("new product information should be filled in and created", () => {
        cy.get("#title")
          .type("The Orange Tree");
    });
});