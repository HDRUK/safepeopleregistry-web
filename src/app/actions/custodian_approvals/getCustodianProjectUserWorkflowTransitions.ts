"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import {
  ResponseOptions,
  ResponseJson,
  GetWorkflowTransitions,
} from "@/types/requests";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<GetWorkflowTransitions>> => {
  const response = await getRequest(
    `/custodian_approvals/projectUsers/workflowTransitions`
  );

  return handleJsonResponse(response, options);
};
