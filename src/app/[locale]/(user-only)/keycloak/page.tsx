import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { isLoggedIn } from "@/utils/auth";
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
  }>;
}) {
  const loggedIn = await isLoggedIn();
  const params = await searchParams;

  return (
    <KeycloakRedirect loggedIn={loggedIn} redirect_uri={params.redirect_path} />
  );
}
