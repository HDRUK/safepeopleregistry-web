"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRefreshAccessToken } from "@/app/actions/auth/getRefreshAccessToken";
import { getLoginUrl, getRegisterUrl } from "./keycloak";
import { getHomepageRedirectPath, isInPath } from "@/utils/redirect-utils";

async function redirectToPath(redirectUrl: string, pathname?: string) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;

  if (
    (pathname && redirectUrl && !isInPath(redirectUrl, pathname)) ||
    !pathname ||
    (pathname !== `/${locale}` && redirectUrl === "/")
  ) {
    redirect(redirectUrl);
  }
}

async function getRefreshTokenRedirectPath() {
  const accessToken = await getRefreshAccessToken();
  const cookieStore = await cookies();

  if (!accessToken) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return getLoginUrl();
  }

  return null;
}

async function redirectInvite() {
  return getRegisterUrl();
}

async function getSeverErrorRedirectPath(
  accessToken: string | undefined,
  pathname: string
) {
  const cookieStore = await cookies();
  console.log(accessToken, "<----<<<");
  if (!accessToken) {
    cookieStore.set("redirectPath", pathname ?? "/", { path: "/" });
  }

  return getHomepageRedirectPath();
}

export {
  getRefreshTokenRedirectPath,
  getSeverErrorRedirectPath,
  redirectInvite,
  redirectToPath,
};
