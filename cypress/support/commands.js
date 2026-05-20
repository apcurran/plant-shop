/// <reference types="cypress" />

Cypress.Commands.add("login", (type) => {
    // Request all required environment variables asynchronously
    cy.env([
        "adminEmail",
        "testUserEmail",
        "adminPassword",
        "testUserPassword",
    ]).then(
        ({ adminEmail, testUserEmail, adminPassword, testUserPassword }) => {
            // Determine credentials inside the asynchronous callback
            const email = type === "admin" ? adminEmail : testUserEmail;
            const password =
                type === "admin" ? adminPassword : testUserPassword;

            cy.request({
                method: "POST",
                url: "http://localhost:3000/api/auth/log-in",
                body: {
                    email: email,
                    password: password,
                },
            }).then((response) => {
                const { accessToken, userInfo } = response.body;
                const { isAdmin } = userInfo;

                window.sessionStorage.setItem("accessToken", accessToken);
                window.sessionStorage.setItem(
                    "userInfo",
                    JSON.stringify(userInfo),
                );
                window.sessionStorage.setItem("isAdmin", isAdmin);

                // redirect user after log in
                cy.visit("/collections");
            });
        },
    );
});
