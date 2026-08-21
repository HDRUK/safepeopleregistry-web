"use server";

import {
  PutCustodianActiveDecisionModelPayload,
  PutCustodianActiveDecisionModelResponse,
} from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  custodianId: number | undefined,
  payload: PutCustodianActiveDecisionModelPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutCustodianActiveDecisionModelResponse>> => {
  const response = await putRequest(
    `/custodian_config/${custodianId}/decision_models`,
    payload
  );

  return handleJsonResponse(response, options);
};
