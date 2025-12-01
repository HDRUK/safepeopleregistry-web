const loginOrganisation = () => {
  cy.login(
    Cypress.env("organisationEmail"),
    Cypress.env("organisationPassword")
  );
cy.getCookie("access_token").then((cookie) => {
  if (cookie) {
    const b64 = Buffer.from(cookie.value).toString("base64");
    cy.task("log", `BASE64_TOKEN: ${b64}`);
  }
});
};

const loginUnapprovedOrganisation = () => {
  cy.login(
    Cypress.env("unapprovedOrganisationEmail"),
    Cypress.env("unapprovedOrganisationPassword")
  );
cy.getCookie("access_token").then((cookie) => {
  if (cookie) {
    const b64 = Buffer.from(cookie.value).toString("base64");
    cy.task("log", `BASE64_TOKEN: ${b64}`);
  }
});
};

export { loginOrganisation, loginUnapprovedOrganisation };
