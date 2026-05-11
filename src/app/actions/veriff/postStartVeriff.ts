"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { PostStartVeriffPayload } from "@/services/veriff";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload?: PostStartVeriffPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostStartVeriffPayload>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_LOCAL_ENV}/api/veriff/start`,
    payload
  );

  return handleJsonResponse(response, options);
};
