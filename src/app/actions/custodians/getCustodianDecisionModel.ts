"use server";

import { GetCustodianDecisionModelResponse } from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { EntityType } from "@/types/api";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  entity_type: EntityType,
  options: ResponseOptions
): Promise<ResponseJson<GetCustodianDecisionModelResponse[]>> => {
  const response = await getRequest(
    `/custodian_config/${id}/decision_models?decision_model_type=${entity_type}`
  );

  return handleJsonResponse(response, options);
};
