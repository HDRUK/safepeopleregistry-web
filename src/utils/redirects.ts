"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRefreshAccessToken } from "@/app/actions/auth/getRefreshAccessToken";
import { ROUTES } from "../consts/router";
import { User } from "../types/application";
import { getProfilePathByEntity } from "./entity";
import { getLoginUrl, getRegisterUrl } from "./keycloak";

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

const getProfileRedirectPath = (user: User) => {
  const redirectPath = getProfilePathByEntity(user);

  return redirectPath;
};

const getRegisterRedirectPath = async () => {
  return ROUTES.register.path;
};

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

function getHomepageRedirectPath() {
  return ROUTES.homepage.path;
}

async function redirectInvite() {
  return getRegisterUrl();
}

async function getSeverErrorRedirectPath(
  accessToken: string | undefined,
  pathname: string
) {
  if (!accessToken) {
    Cookies.set("redirectPath", pathname ?? "/", { path: "/" });
  }

  return getHomepageRedirectPath();
}

function isInPath(pathname: string, pathToCompare: string | string[]) {
  if (Array.isArray(pathToCompare)) {
    return pathToCompare.some(item => item.includes(pathname));
  }

  return pathToCompare.includes(pathname);
}

export {
  getHomepageRedirectPath,
  getProfileRedirectPath,
  getRefreshTokenRedirectPath,
  getRegisterRedirectPath,
  getSeverErrorRedirectPath,
  isInPath,
  redirectInvite,
  redirectToPath,
};
