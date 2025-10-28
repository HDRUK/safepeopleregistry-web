const loginUser = () => {
  cy.login(Cypress.env("userEmail"), Cypress.env("userPassword"));
};

export { loginUser };
