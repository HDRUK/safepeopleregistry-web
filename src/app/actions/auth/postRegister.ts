"use server";

import { PostRegisterPayload, PostRegisterResponse } from "@/services/auth";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  payload?: PostRegisterPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostRegisterResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/register`,
    payload
  );

  return handleJsonResponse(response, options);
};
