"use server";

import { GetOrganisationStatusResponse } from "@/app/actions/organisations/getOrganisationStatus";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson } from "@/types/requests";

export default async (
  organisationId: number
): Promise<ResponseJson<GetOrganisationStatusResponse>> => {
  const response = await getRequest(`/organisations/${organisationId}/status`);

  return handleJsonResponse(response);
};
