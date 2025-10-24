const loginCustodian = () => {
  cy.login(Cypress.env("custodianEmail"), Cypress.env("custodianPassword"));
};

export { loginCustodian };
