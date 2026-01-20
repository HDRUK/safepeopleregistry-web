const getKeycloakLoginPath = () => {
  const authUrl = `/realms/${Cypress.env("keycloakRealm")}/protocol/openid-connect/auth`;
  const params = new URLSearchParams({
    client_id: Cypress.env("keycloakClientId"),
    response_type: "code",
    redirect_uri: Cypress.env("keycloakLoginRedirectUrl"),
    scope: "openid profile email",
  });

  return `${authUrl}?${params.toString()}`;
};

const getKeycloakLogoutPath = () => {
  const logoutUrl = `$/realms/${Cypress.env("keycloakRealm")}/protocol/openid-connect/logout`;
  const params = new URLSearchParams({
    client_id: Cypress.env("keycloakClientId"),
    post_logout_redirect_uri: Cypress.env("keycloakLogoutRedirectUrl"),
  });

  return `${logoutUrl}?${params.toString()}`;
};

function checkExpiredRedirect() {
  cy.clearCookie("access_token");
  cy.reload();

  cy.url().should("eq", Cypress.config("baseUrl"));
}

export { getKeycloakLogoutPath, getKeycloakLoginPath, checkExpiredRedirect };
