"use server";

import { MeResponse } from "@/services/auth";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<MeResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/me`
  );

  return await handleJsonResponse(response, options);
};
