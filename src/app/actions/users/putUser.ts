"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { PutUserPayload, PutUserResponse } from "@/services/users";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  payload: PutUserPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutUserResponse>> => {
  const response = await putRequest(`/users/${id}`, payload);

  return handleJsonResponse(response, options);
};
