"use server";

import { GetCustodianProjectUserResponse } from "@/services/custodian_approvals";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  custodianId: number,
  projectUserId: number,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodianProjectUserResponse>> => {
  const response = await getRequest(
    `/custodian_approvals/${custodianId}/projectUsers/${projectUserId}`
  );
  return handleJsonResponse(response, options);
};
