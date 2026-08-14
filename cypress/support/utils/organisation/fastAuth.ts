const performKeycloakCodeLogin = (email: string, password: string) => {
  const keycloakBaseUrl = Cypress.env("keycloakBaseUrl");
  const realm = Cypress.env("keycloakRealm");
  const clientId = Cypress.env("keycloakClientId");
  const redirectUri = Cypress.env("keycloakLoginRedirectUrl");

  const authUrl =
    `${keycloakBaseUrl}/realms/${realm}/protocol/openid-connect/auth?` +
    new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: "openid profile email",
    }).toString();

  cy.request(authUrl).then(getResponse => {
    const action = Cypress.$(getResponse.body)
      .find("form#kc-form-login")
      .attr("action");

    expect(action, "Keycloak login form action url").to.be.a("string").and.not
      .be.empty;

    cy.request({
      method: "POST",
      url: action as string,
      form: true,
      followRedirect: true,
      body: { username: email, password },
    });
  });

  cy.getCookie("access_token").should("exist");
};

/**
 * Scripted equivalent of cy.login: drives the same Keycloak
 * authorization_code exchange via cy.request instead of visiting and
 * filling in the hosted Keycloak login form in the browser.
 */
const loginViaApi = (email: string, password: string) => {
  cy.session(
    { email, password, via: "api" },
    () => {
      performKeycloakCodeLogin(email, password);
    },
    {
      validate() {
        cy.getCookie("access_token").should("exist");
      },
    }
  );
};

export { loginViaApi };
