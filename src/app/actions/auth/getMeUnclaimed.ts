"use server";

import { MeResponse } from "@/services/auth";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  inviteCode?: string,
  options?: ResponseOptions
): Promise<ResponseJson<MeResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/me_unclaimed${inviteCode ? `?invite_code=${inviteCode}` : ""}`
  );

  return handleJsonResponse(response, options);
};
