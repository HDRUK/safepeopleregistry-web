"use server";

import {
  PutAffiliationsPayload,
  PutAffiliationsResponse,
} from "@/services/affiliations/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  affiliationId: number,
  payload: PutAffiliationsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutAffiliationsResponse>> => {
  const response = await putRequest(`/affiliations/${affiliationId}`, payload);

  return handleJsonResponse(response, options);
};
