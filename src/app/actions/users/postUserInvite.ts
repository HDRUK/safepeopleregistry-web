"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import {
  PostUserInvitePayload,
  PostUserInviteResponse,
} from "@/services/users";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: PostUserInvitePayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostUserInviteResponse>> => {
  const response = await postRequest(`/users/invite`, payload);

  return handleJsonResponse(response, options);
};
