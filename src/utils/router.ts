"use server";

import { EXCLUDE_REDIRECT_URLS, ROUTES } from "@/consts/router";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import getMe from "../services/auth/getMe";
import { RouteConfig, Routes } from "../types/router";
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

function needsLoggedInPermissions(routes: Routes, pathname: string | null) {
  if (!pathname) return false;

  return Object.keys(routes).some((key: string) => {
    const route: RouteConfig = routes[key as keyof Routes];

    return pathname.includes(route.path, 0) && route.permissions;
  });
}

async function getPathServerSide(): Promise<string | null> {
  const head = await headers();
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
      redirectToPath(getProfileRedirectPath(response.data), pathname);
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

export { getPathServerSide, needsLoggedInPermissions, redirectProfile };
