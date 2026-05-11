"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export type PutCustodianRulesPayload = {
  rule_ids: number[];
};

type PutCustodianRulesResponse = {
  data: boolean;
};

export default async (
  id: number,
  payload: PutCustodianRulesPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutCustodianRulesResponse>> => {
  const response = await putRequest(`/custodians/${id}/rules`, payload);

  return handleJsonResponse(response, options);
};
