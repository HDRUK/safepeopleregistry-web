"use server";

import { postRequest } from "@/services/requests";

export async function getRefreshAccessToken(): Promise<string | undefined> {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_LOCAL_ENV}/api/auth/refresh`
  );

  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();

  return data.access_token;
}
