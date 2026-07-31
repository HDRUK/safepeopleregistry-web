"use server";

import {
  PutAccreditationsPayload,
  PutAccreditationsResponse,
} from "@/services/accreditations/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  registryId: number,
  payload: PutAccreditationsPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutAccreditationsResponse>> => {
  const response = await putRequest(
    `/accreditations/${id}/registries/${registryId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
