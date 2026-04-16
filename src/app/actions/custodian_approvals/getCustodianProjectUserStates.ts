"use server";

import { WorkflowStateResponse } from "@/services/custodian_approvals";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<WorkflowStateResponse>> => {
  const url = `/custodian_approvals/projectUsers/workflowStates`;
  const response = await getRequest(url);
  return handleJsonResponse(response, options);
};
