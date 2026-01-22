const loginUser = (email?: string, password?: string) => {
  cy.login(
    email || Cypress.env("userEmail"),
    password || Cypress.env("userPassword")
  );
};

export { loginUser };
