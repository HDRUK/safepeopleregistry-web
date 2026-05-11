"use server";

import {
  PutOrganisationPayload,
  OrganisationResponse,
} from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  payload: PutOrganisationPayload,
  options?: ResponseOptions
): Promise<ResponseJson<OrganisationResponse>> => {
  const response = await putRequest(`/organisations/${id}`, payload);

  return handleJsonResponse(response, options);
};
