"use client";

import cookies from "js-cookie";
import { getGatewayLoginUrl, getLoginUrl } from "./keycloak";

function redirectKeycloak({
  redirect_uri,
  loggedIn,
  external_redirect,
}: {
  loggedIn: boolean;
  redirect_uri: string;
  external_redirect?: string;
}) {
  if (external_redirect) {
    // A Gateway-originated login always re-authenticates against the
    // gateway Keycloak client, regardless of any existing Registry session -
    // the token needs to be scoped for Gateway, not for this app.
    cookies.set("external_redirect", external_redirect);
    window.location.href = getGatewayLoginUrl();
    return;
  }

  cookies.set("redirectPath", redirect_uri);

  let redirectUri = redirect_uri;

  if (!loggedIn) {
    redirectUri = getLoginUrl();
  }

  window.location.href = redirectUri;
}

export { redirectKeycloak };
