"use client";

import { redirectKeycloak } from "@/utils/redirectsClient";

interface KeycloakRedirectProps {
  loggedIn: boolean;
  redirect_uri: string;
}

export default function KeycloakRedirect({
  loggedIn,
  redirect_uri,
}: KeycloakRedirectProps) {
  redirectKeycloak({
    loggedIn,
    redirect_uri,
  });

  return null;
}
