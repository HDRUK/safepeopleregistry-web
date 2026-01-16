"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "../consts/router";
import { getRefreshAccessToken } from "../services/auth";
import { User } from "../types/application";
import { Routes } from "../types/router";
import { getLoginUrl, getRegisterUrl } from "./keycloak";
import { capitaliseFirstLetter } from "./string";

async function redirectToPath(redirectUrl: string, pathname?: string) {
  const locale = await cookies().get("NEXT_LOCALE")?.value;

  if (
    (pathname && redirectUrl && !isInPath(redirectUrl, pathname)) ||
    !pathname ||
    (pathname !== `/${locale}` && redirectUrl === "/")
  ) {
    redirect(redirectUrl);
  }
}

function getProfilePathByEntity(user: User | string) {
  if (!user) return ROUTES.homepage.path;

  const profileEntity = capitaliseFirstLetter(
    (typeof user === "string" ? user : user.user_group)
      .replace(/USER/i, "RESEARCHER")
      .replace(/s$/i, "")
      .toLowerCase()
  );

  return ROUTES[`profile${profileEntity}` as keyof Routes].path;
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
  getProfilePathByEntity,
  getProfileRedirectPath,
  getRefreshTokenRedirectPath,
  getRegisterRedirectPath,
  getSeverErrorRedirectPath,
  isInPath,
  redirectInvite,
  redirectToPath,
};
