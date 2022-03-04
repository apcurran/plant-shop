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

        window.localStorage.setItem("accessToken", accessToken);
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        window.localStorage.setItem("isAdmin", isAdmin);
    });
});
