"use server";

import {
  GetWorkflowTransitions,
  ResponseJson,
  ResponseOptions,
} from "@/types/requests";
import { getRequest } from "@/services/requests";
import { handleJsonResponse } from "@/services/requestHelpers";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<GetWorkflowTransitions>> => {
  const response = await getRequest(
    `/custodian_approvals/projectOrganisations/workflowTransitions`
  );

  return handleJsonResponse(response, options);
};
