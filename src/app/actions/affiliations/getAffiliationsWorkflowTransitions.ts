"use server";

import { WorkflowTransitions } from "@/services/custodian_approvals";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<WorkflowTransitions>> => {
  const response = await getRequest(`/affiliations/workflowTransitions`);

  return handleJsonResponse(response, options);
};
