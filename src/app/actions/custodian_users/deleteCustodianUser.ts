"use server";

import { ResponseJson, ResponseOptions } from "@/types/requests";
import { deleteRequest } from "@/services/requests";
import { handleJsonResponse } from "@/services/requestHelpers";

import { GetCustodiansUsersResponse } from "@/services/custodian_users/types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<GetCustodiansUsersResponse>> => {
  const response = await deleteRequest(`/custodian_users/${id}`);

  return handleJsonResponse(response, options);
};
