"use server";

import { PostOrganisationInviteResponse } from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<PostOrganisationInviteResponse>> => {
  const response = await postRequest(`/organisations/${id}/invite`);

  return handleJsonResponse(response, options);
};
