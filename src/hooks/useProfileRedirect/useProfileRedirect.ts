"use server";

import getMe from "../../services/auth/getMe";
import { getAccessToken } from "../../utils/auth";
import { getProfileRedirectPath, redirectToPath } from "../../utils/redirects";
import usePathServerSide from "../usePathServerSide";

export default async function useProfileRedirect() {
  const pathname = usePathServerSide();

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
