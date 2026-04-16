"use server";

import {
  PutCustodianPayload,
  PutCustodianResponse,
} from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  payload: PutCustodianPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutCustodianResponse>> => {
  const response = await putRequest(`/custodians/${id}`, payload);

  return handleJsonResponse(response, options);
};
