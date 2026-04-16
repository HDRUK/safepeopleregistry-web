"use server";

import {
  PostAffiliationPayload,
  PostAffiliationsResponse,
} from "@/services/affiliations/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  registryId: number,
  payload: PostAffiliationPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostAffiliationsResponse>> => {
  const response = await postRequest(`/affiliations/${registryId}`, payload);

  return handleJsonResponse(response, options);
};
