"use server";

import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "@/services/requests";
import { handleJsonResponse } from "@/services/requestHelpers";
import { GetCustodianProjectOrganisationResponse } from "@/services/custodian_approvals/types";

export default async (
  custodianId: number,
  projectOrganisationId: number,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodianProjectOrganisationResponse>> => {
  const response = await getRequest(
    `/custodian_approvals/${custodianId}/projectOrganisations/${projectOrganisationId}`
  );
  return handleJsonResponse(response, options);
};
