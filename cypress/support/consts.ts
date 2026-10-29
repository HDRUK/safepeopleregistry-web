const DEFAULT_USER_ID = 10;

// TEMPORARY: since Keycloak 26.7 the registration page no longer renders a
// password field, but the theme's register.ftl still loads the password
// validator, which throws on getElementById("password").addEventListener.
// Remove once register.ftl in hdruk-keycloak only loads it when passwordRequired.
const KEYCLOAK_PASSWORD_VALIDATOR_ERROR =
  /Cannot read properties of null \(reading 'addEventListener'\)/;

export { DEFAULT_USER_ID, KEYCLOAK_PASSWORD_VALIDATOR_ERROR };
