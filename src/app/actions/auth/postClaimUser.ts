"use server";

import { PostRegisterResponse } from "@/services/auth";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<PostRegisterResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/claimUser/${id}`
  );

  return handleJsonResponse(response, options);
};
