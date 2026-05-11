"use server";

import {
  PutCustodianActiveEntityModelPayload,
  PutCustodianActiveEntityModelResponse,
} from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  custodianId: number | undefined,
  payload: PutCustodianActiveEntityModelPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutCustodianActiveEntityModelResponse>> => {
  const response = await putRequest(
    `/custodian_config/${custodianId}/entity_models`,
    payload
  );

  return handleJsonResponse(response, options);
};
