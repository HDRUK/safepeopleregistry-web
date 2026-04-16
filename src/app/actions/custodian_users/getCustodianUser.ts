"use server";

import { GetCustodianUserResponse } from "@/services/custodian_users";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodianUserResponse>> => {
  const response = await getRequest(`/custodian_users/${id}`);

  return handleJsonResponse(response, options);
};
