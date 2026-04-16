"use server";

import { EXCLUDE_REDIRECT_URLS, ROUTES } from "@/consts/router";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import getMe from "@/app/actions/auth/getMe";
import { needsLoggedInPermissions } from "@/utils/loggedInPermission";
import { getAccessToken } from "./auth";
import {
  getHomepageRedirectPath,
  getProfileRedirectPath,
  getRefreshTokenRedirectPath,
  getRegisterRedirectPath,
  getSeverErrorRedirectPath,
  isInPath,
  redirectToPath,
} from "./redirects";

async function getPathServerSide(): Promise<string | null> {
  const head = headers();
  return head.get("x-current-path");
}

async function redirectProfile() {
  const pathname = await getPathServerSide();
  const accessToken = await getAccessToken();

  if (!accessToken && needsLoggedInPermissions(ROUTES, pathname)) {
    redirect(ROUTES.homepage.path);
  }

  if (accessToken && pathname) {
    const response = await getMe({
      suppressThrow: true,
    });

    if (response.status === 200) {
      await redirectToPath(getProfileRedirectPath(response.data), pathname);
    }
  }
}

export default async function redirectApplication() {
  const pathname = await getPathServerSide();

  if (pathname && !isInPath(pathname, EXCLUDE_REDIRECT_URLS)) {
    let redirectUrl;

    const accessToken = await getAccessToken();
    let me;

    if (accessToken) {
      const response = await getMe({
        suppressThrow: true,
      });

      me = response.data;

      if (response.status === 200) {
        redirectUrl = getProfileRedirectPath(me);
      } else if (response.status === 401) {
        redirectUrl = await getRefreshTokenRedirectPath();
      } else if (response.status === 404) {
        redirectUrl = await getRegisterRedirectPath();
      } else if (response.status === 500) {
        redirectUrl = await getSeverErrorRedirectPath(accessToken, pathname);
      }

      if (redirectUrl) await redirectToPath(redirectUrl, pathname);

      return me;
    }

    await redirectToPath(getHomepageRedirectPath(), pathname);
  }

  return null;
}

export { getPathServerSide, redirectProfile };
