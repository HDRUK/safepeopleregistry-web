"use server";

import {
  UpdateOrganisationPermissonsPayload,
  UpdateOrganisationPermissionsResponse,
} from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: UpdateOrganisationPermissonsPayload,
  options: ResponseOptions
): Promise<ResponseJson<UpdateOrganisationPermissionsResponse>> => {
  const response = await postRequest(`/organisations/permissions`, payload);

  return handleJsonResponse(response, options);
};
