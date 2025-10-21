const loginOrganisation = () => {
  cy.login(
    Cypress.env("organisationEmail"),
    Cypress.env("organisationPassword")
  );
};

export { loginOrganisation };
