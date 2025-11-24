"use server";

import { ROUTES } from "@/consts/router";
import { needsLoggedInPermissions } from "@/utils/router";
import { redirect } from "next/navigation";
import getMe from "../../services/auth/getMe";
import { getAccessToken } from "../../utils/auth";
import { getProfileRedirectPath, redirectToPath } from "../../utils/redirects";
import usePathServerSide from "../usePathServerSide";

export default async function useProfileRedirect() {
  const pathname = usePathServerSide();

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
