import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/utils/auth";
import { isEnterpriseSamlSsoEnabled } from "@/flags";
import { getLoginUrl } from "@/utils/keycloak";
import { PageBody } from "@/modules";
import SignInEmailForm from "./components/SignInEmailForm";

export const metadata: Metadata = {
  title: `Sign In | ${SITE_NAME}`,
  description: "Sign in to Safe People Registry.",
};

export default async function Page() {
  if (await isLoggedIn()) {
    redirect("/");
  }

  // The domain-lookup step is part of the enterprise SAML SSO feature -
  // when it's off, behave exactly as if this page never existed.
  if (!(await isEnterpriseSamlSsoEnabled())) {
    redirect(getLoginUrl());
  }

  return (
    <PageBody>
      <SignInEmailForm />
    </PageBody>
  );
}
