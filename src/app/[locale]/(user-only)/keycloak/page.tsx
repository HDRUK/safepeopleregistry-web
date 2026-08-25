import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { isLoggedIn } from "@/utils/auth";
import { isAllowedExternalRedirect } from "@/utils/externalRedirect";
import KeycloakRedirect from "./components/KeycloakRedirect";

export const metadata: Metadata = {
  title: `Sign In | ${SITE_NAME}`,
  description: "Sign in to Safe People Registry.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    redirect_path: string;
    external_redirect?: string;
  }>;
}) {
  const loggedIn = await isLoggedIn();
  const params = await searchParams;

  const externalRedirect = isAllowedExternalRedirect(params.external_redirect)
    ? params.external_redirect
    : undefined;

  return (
    <KeycloakRedirect
      loggedIn={loggedIn}
      redirect_uri={params.redirect_path}
      external_redirect={externalRedirect}
    />
  );
}
