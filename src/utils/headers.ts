import { headers } from "next/headers";
import { EXCLUDE_REDIRECT_URLS } from "../consts/router";
import getMe from "../services/auth/getMe";
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

async function getServerSidePath(): Promise<string | null> {
  const head = await headers();
  return head.get("x-current-path");
}

export default async function redirectApplication() {
  const pathname = await getServerSidePath();

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

      if (redirectUrl) return redirectToPath(redirectUrl, pathname);
    }

    return redirectToPath(getHomepageRedirectPath(), pathname);
  }

  return null;
}

async function redirectProfile() {
  const pathname = await getServerSidePath();
  const accessToken = await getAccessToken();

  if (accessToken && pathname) {
    const response = await getMe({
      suppressThrow: true,
    });

    if (response.status === 200) {
      redirectToPath(getProfileRedirectPath(response.data), pathname);
    }
  }
}

export { getServerSidePath, redirectApplication, redirectProfile };
