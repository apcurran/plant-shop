/// <reference types="cypress" />

Cypress.Commands.add("login", (type) => {
    // dual log in functionality for either a user or admin
    const email = type === "admin" ? Cypress.env("adminEmail") : Cypress.env("testUserEmail");
    const password = type === "admin" ? Cypress.env("adminPassword") : Cypress.env("testUserPassword");

    cy.request({
        method: "POST",
        url: "http://localhost:3000/api/auth/log-in",
        body: {
            email: email,
            password: password
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
