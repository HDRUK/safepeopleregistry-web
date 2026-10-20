"use server";

import { PostOrganisationUnclaimedPayload } from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: PostOrganisationUnclaimedPayload,
  options: ResponseOptions
): Promise<ResponseJson<number>> => {
  const response = await postRequest(`/organisations/unclaimed`, payload);

  return handleJsonResponse(response, options);
};
