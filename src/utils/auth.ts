"use server";

import { User } from "@/types/application";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

async function getAccessToken(): Promise<string | undefined> {
  return (await cookies()).get("access_token")?.value;
}

async function getDecodedAccessToken(): Promise<Partial<User> | undefined> {
  const accessToken = await getAccessToken();

  return accessToken ? jwtDecode(accessToken) : undefined;
}

async function isLoggedIn() {
  const accessToken = await getAccessToken();

  return !!accessToken;
}

export { getAccessToken, getDecodedAccessToken, isLoggedIn };
