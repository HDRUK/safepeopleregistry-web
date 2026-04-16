"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { PostUserPayload, PostUserResponse } from "@/services/users/types";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  payload: PostUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostUserResponse>> => {
  const response = await postRequest(`/users`, payload);

  return handleJsonResponse(response, options);
};
