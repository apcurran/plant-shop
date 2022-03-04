/// <reference types="cypress" />

describe("admin add new product", () => {
    beforeEach(() => {
        cy.login("admin");
    });

    it("navigate to add product page, fill out form data, and submit", () => {
        // stub API req
        cy.intercept("POST", "/api/products", {
            statusCode: 201,
            body: {
                message: "Product information added."
            }
        });

        cy.contains("a", /add product/i)
            .should("exist")
            .click();

        cy.contains("h2", "Product Info")
            .should("exist");

        cy.get("input[id=title]")
            .type("The Pomegranate Tree");

        cy.get("textarea[id=description]")
            .type("Lorem ipsum");

        cy.get("select[id=category]")
            .select("fruit trees");

        cy.get("input[id=size-small-amt]")
            .type("1");

        cy.get("input[id=size-small-price]")
            .type("15");

        cy.get("input[id=size-medium-amt]")
            .type("2");

        cy.get("input[id=size-medium-price]")
            .type("20");

        cy.get("input[id=size-large-amt]")
            .type("3");

        cy.get("input[id=size-large-price]")
            .type("25");

        cy.fixture("images/pomegranate-tree.jpg")
            .as("pomTree");

        cy.get("input[id=img-file]")
            .selectFile("@pomTree");

        cy.get("textarea[id=img-alt-txt]")
            .type("A sliced pomegranate sitting on a stack of other pomegranates.");

        cy.contains("button", /submit/i)
            .should("exist")
            .click();
    });
});