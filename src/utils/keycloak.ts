import cookies from "js-cookie";
import { UserGroup } from "@/consts/user";
import keycloakConfig from "../config/keycloak";
import keycloakGatewayConfig from "../config/keycloakGateway";

const getLoginUrl = () => {
  const authUrl = `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/auth`;
  const params = new URLSearchParams({
    client_id: keycloakConfig.clientId,
    response_type: "code",
    redirect_uri: keycloakConfig.redirectUriLogin,
    scope: "openid profile email",
  });

  return `${authUrl}?${params.toString()}`;
};

const handleLogin = () => {
  window.location.href = getLoginUrl();
};

const getLogoutUrl = () => {
  const logoutUrl = `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/logout`;
  const params = new URLSearchParams({
    client_id: keycloakConfig.clientId,
    post_logout_redirect_uri: keycloakConfig.redirectUriLogout,
  });

  return `${logoutUrl}?${params.toString()}`;
};

const handleLogout = () => {
  window.location.href = getLogoutUrl();
};

const getRegisterUrl = (
  selectedUserGroup?: UserGroup | null,
  extraParams?: object
) => {
  const registerUrl = `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/registrations`;

  const params = new URLSearchParams({
    client_id: keycloakConfig.clientId,
    scope: "openid profile email",
    redirect_uri: keycloakConfig.redirectUriRegister,
    response_type: "code",
    ...(selectedUserGroup && { state: selectedUserGroup.toString() }),
  });

  if (extraParams) {
    Object.entries(extraParams).forEach(([key, value]) => {
      if (value !== null) {
        params.append(key, value);
      }
    });
  }

  return `${registerUrl}?${params.toString()}`;
};

const handleRegister = (
  selectedUserGroup?: UserGroup | null,
  externalRedirect?: string
) => {
  if (externalRedirect) {
    cookies.set("external_redirect", externalRedirect);
    window.location.href = getGatewayRegisterUrl(selectedUserGroup);
    return;
  }

  window.location.href = getRegisterUrl(selectedUserGroup);
};

// Gateway-originated flows authenticate against a dedicated Keycloak client
// (redirect_uri still points back into this app - see /api/auth/gateway/*)
// so the resulting token is scoped for handoff rather than a Registry session.
const getGatewayLoginUrl = () => {
  const authUrl = `${keycloakGatewayConfig.authServerUrl}/realms/${keycloakGatewayConfig.realm}/protocol/openid-connect/auth`;
  const params = new URLSearchParams({
    client_id: keycloakGatewayConfig.clientId,
    response_type: "code",
    redirect_uri: keycloakGatewayConfig.redirectUriLogin,
    scope: "openid profile email",
  });

  return `${authUrl}?${params.toString()}`;
};

const getGatewayRegisterUrl = (selectedUserGroup?: UserGroup | null) => {
  const registerUrl = `${keycloakGatewayConfig.authServerUrl}/realms/${keycloakGatewayConfig.realm}/protocol/openid-connect/registrations`;

  const params = new URLSearchParams({
    client_id: keycloakGatewayConfig.clientId,
    scope: "openid profile email",
    redirect_uri: keycloakGatewayConfig.redirectUriRegister,
    response_type: "code",
    ...(selectedUserGroup && { state: selectedUserGroup.toString() }),
  });

  return `${registerUrl}?${params.toString()}`;
};

export {
  handleLogin,
  handleLogout,
  handleRegister,
  getRegisterUrl,
  getLoginUrl,
  getLogoutUrl,
  getGatewayLoginUrl,
  getGatewayRegisterUrl,
};
