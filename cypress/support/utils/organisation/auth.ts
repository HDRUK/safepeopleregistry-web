const loginOrganisation = () => {
  cy.login(
    Cypress.env("organisationEmail"),
    Cypress.env("organisationPassword")
  );
  cy.getCookie("access_token").then((cookie) => {
  if (cookie) {
    cy.task("log", `ACCESS TOKEN: ${cookie.value}`);
  } else {
    cy.task("log", "access_token cookie NOT FOUND");
  }})
};

const loginUnapprovedOrganisation = () => {
  cy.login(
    Cypress.env("unapprovedOrganisationEmail"),
    Cypress.env("unapprovedOrganisationPassword")
  );
  cy.getCookie("access_token").then((cookie) => {
  if (cookie) {
    cy.task("log", `ACCESS TOKEN: ${cookie.value}`);
  } else {
    cy.task("log", "access_token cookie NOT FOUND");
  }})
};

export { loginOrganisation, loginUnapprovedOrganisation };
