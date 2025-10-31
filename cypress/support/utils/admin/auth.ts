const loginAdmin = () => {
  cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
};

export { loginAdmin };
