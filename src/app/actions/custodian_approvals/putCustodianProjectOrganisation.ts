"use server";

import {
  ChangeValidationStatusPayload,
  GetCustodianProjectUserResponse,
} from "@/services/custodian_approvals";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  custodianId: number,
  projectOrganisationId: number,
  payload: ChangeValidationStatusPayload,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodianProjectUserResponse>> => {
  const response = await putRequest(
    `/custodian_approvals/${custodianId}/projectOrganisations/${projectOrganisationId}`,
    payload
  );
  return handleJsonResponse(response, options);
};
