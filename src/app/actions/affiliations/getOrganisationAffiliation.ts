"use server";

import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ResearcherAffiliation } from "@/types/application";
import { getRequest } from "@/services/requests";
import { handleJsonResponse } from "@/services/requestHelpers";

export default async (
  registryId: number,
  organisationId: number,
  options: ResponseOptions,
  affiliationId?: number
): Promise<ResponseJson<ResearcherAffiliation>> => {
  // Without an affiliation id, the API returns the current affiliation, else the latest
  const response = await getRequest(
    `/affiliations/${registryId}/organisation/${organisationId}${
      affiliationId ? `?affiliation_id=${affiliationId}` : ""
    }`
  );

  return handleJsonResponse(response, options);
};
