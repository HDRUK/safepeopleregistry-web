const loginOrganisation = () => {
  cy.login(
    Cypress.env("organisationEmail"),
    Cypress.env("organisationPassword")
  );
  cy.getCookie("COOKIE_VALUE").then((cookie) => {
 if (cookie) {
    cy.task("log", JSON.stringify({ token: cookie.value }));
  } else {
    cy.task("log", "COOKIE_VALUE cookie NOT FOUND");
  }})
};

const loginUnapprovedOrganisation = () => {
  cy.login(
    Cypress.env("unapprovedOrganisationEmail"),
    Cypress.env("unapprovedOrganisationPassword")
  );
  cy.getCookie("access_token").then((cookie) => {
  if (cookie) {
    cy.task("log", `COOKIE_VALUE: ${cookie.value}`);
  } else {
    cy.task("log", "COOKIE_VALUE cookie NOT FOUND");
  }})
};

export { loginOrganisation, loginUnapprovedOrganisation };
