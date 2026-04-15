"use server";

import {
  AffiliationStatus,
  PutAffiliationsResponse,
} from "@/services/affiliations/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  registryId: number,
  affiliationId: number,
  status: AffiliationStatus,
  options?: ResponseOptions
): Promise<ResponseJson<PutAffiliationsResponse>> => {
  const response = await putRequest(
    `/affiliations/${registryId}/affiliation/${affiliationId}?status=${status}`
  );

  return handleJsonResponse(response, options);
};
