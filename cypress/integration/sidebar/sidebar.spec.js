/// <reference types="cypress" />

describe("sidebar filter", () => {
    beforeEach(() => {
        cy.visit("/collections");
    });

    it("should show all plant types when navigating to '/collections' route", () => {
        cy.contains("h3", /The Pothos Plant/i);
        cy.contains("h3", /The Fuji Apple/i);
        cy.contains("h3", /The Ash Tree/i);
    });

    it("should display only house plants when the 'House Plants' sidebar nav link is clicked", () => {
        cy.contains("a", "House Plants")
          .click();
        
        cy.contains(/The Peace Lily/i).should("exist");
        cy.contains(/The Fuji Apple/i).should("not.exist");
        cy.contains(/The Ash Tree/i).should("not.exist");
    });

    it("should display only fruit trees when the 'Fruit Trees' sidebar nav link is clicked", () => {
        cy.contains("a", "Fruit Trees")
          .click();

        cy.contains(/The Fuji Apple/i).should("exist");
        cy.contains(/The Peace Lily/i).should("not.exist");
        cy.contains(/The Ash Tree/i).should("not.exist");
    });

    it("should display only shade trees when the 'Shade Trees' sidebar nav link is clicked", () => {
        cy.contains("a", "Shade Trees")
          .click();

        cy.contains(/The Ash Tree/i).should("exist");
        cy.contains(/The Fuji Apple/i).should("not.exist");
        cy.contains(/The Peace Lily/i).should("not.exist");
    });
});