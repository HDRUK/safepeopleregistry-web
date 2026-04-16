"use server";

import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "@/services/requests";
import { handleJsonResponse } from "@/services/requestHelpers";
import { WorkflowStateResponse } from "@/services/custodian_approvals/types";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<WorkflowStateResponse>> => {
  const url = `/custodian_approvals/projectOrganisations/workflowStates`;
  const response = await getRequest(url);
  return handleJsonResponse(response, options);
};
