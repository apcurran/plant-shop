/// <reference types="cypress" />

Cypress.Commands.add("login", () => {
    cy.request({
        method: "POST",
        url: "http://localhost:3000/api/auth/log-in",
        body: {
            email: Cypress.env("testUserEmail"),
            password: Cypress.env("testUserPassword")
        }
    })
    .then((response) => {
        const { accessToken, userInfo } = response.body;
        const { isAdmin } = userInfo;

        window.sessionStorage.setItem("accessToken", accessToken);
        window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        window.sessionStorage.setItem("isAdmin", isAdmin);

        // redirect user after log in
        cy.visit("/collections");
    });
});
