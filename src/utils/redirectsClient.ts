"use client";

import cookies from "js-cookie";
import { getLoginUrl } from "./keycloak";

function redirectKeycloak({
  redirect_uri,
  loggedIn,
}: {
  loggedIn: boolean;
  redirect_uri: string;
}) {
  cookies.set("redirectPath", redirect_uri);

  let redirectUri = redirect_uri;

  if (!loggedIn) {
    redirectUri = getLoginUrl();
  }

  window.location.href = redirectUri;
}

export { redirectKeycloak };
