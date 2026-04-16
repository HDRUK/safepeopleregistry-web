"use server";

import {
  PostOrganisationInviteUserPayload,
  PostOrganisationInviteUserResponse,
} from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  payload: PostOrganisationInviteUserPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostOrganisationInviteUserResponse>> => {
  const response = await postRequest(
    `/organisations/${id}/invite_user`,
    payload
  );

  return handleJsonResponse(response, options);
};
