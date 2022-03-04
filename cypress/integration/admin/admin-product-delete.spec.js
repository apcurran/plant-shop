/// <reference types="cypress" />

describe("admin delete action", () => {
    beforeEach(() => {
        cy.login("admin");
    });

    it("deletes 'The Tangerine Tree' product", () => {
        // stub API req
        cy.intercept("DELETE", "/api/products/17", {
            statusCode: 200,
            body: {
                msg: "Product removed."
            }
        });

        cy.get("a[href=\"/collections/17\"]")
            .should("exist")
            .next()
            .next()
            .should("have.text", "Delete")
            .click();

        cy.get("a[href=\"/collections/17\"]")
            .should("not.exist");
    });
});