const dataCy = (value: string) => {
  return `[data-cy="${value}"]`;
};

const getLoginPath = () => {
  const authUrl = `/realms/${Cypress.env("keycloakRealm")}/protocol/openid-connect/auth`;
  const params = new URLSearchParams({
    client_id: Cypress.env("keycloakClientId"),
    response_type: "code",
    redirect_uri: Cypress.env("keycloakLoginRedirectUrl"),
    scope: "openid profile email",
  });

  return `${authUrl}?${params.toString()}`;
};

const getLogoutPath = () => {
  const logoutUrl = `$/realms/${Cypress.env("keycloakRealm")}/protocol/openid-connect/logout`;
  const params = new URLSearchParams({
    client_id: Cypress.env("keycloakClientId"),
    post_logout_redirect_uri: Cypress.env("keycloakLogoutRedirectUrl"),
  });

  return `${logoutUrl}?${params.toString()}`;
};

const logout = () => {
  cy.get("button")
    .contains("Sign Out")
    .click()
    .then(() => {
      cy.origin(Cypress.env("keycloakBaseUrl"), { args: null }, () => {
        const { getLogoutPath } = Cypress.require("./utils/common");

        cy.visit(getLogoutPath());

        cy.get("#kc-logout").click();
      });
    });
};

export { dataCy, getLoginPath, logout };
