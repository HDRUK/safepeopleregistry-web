"use server";

import { PostOrganisationNewAccountPayload } from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: PostOrganisationNewAccountPayload,
  options?: ResponseOptions
): Promise<ResponseJson<number>> => {
  const response = await postRequest(`/organisations/new_account`, payload);

  return handleJsonResponse(response, options);
};
