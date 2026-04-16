"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import {
  PutSubsidiaryPayload,
  PutSubsidiaryResponse,
} from "@/services/subsidiaries";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  subsidaryId: number,
  orgId: number,
  payload: PutSubsidiaryPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutSubsidiaryResponse>> => {
  const response = await putRequest(
    `/subsidiaries/${orgId}/organisations/${subsidaryId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
