"use server";

import {
  PostOrganisationPayload,
  PostOrganisationResponse,
} from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: PostOrganisationPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostOrganisationResponse>> => {
  const response = await postRequest(`/organisations`, payload);

  return handleJsonResponse(response, options);
};
