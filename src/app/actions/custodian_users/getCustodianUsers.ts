"use server";

import { GetCustodiansUsersResponse } from "@/services/custodian_users";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodiansUsersResponse>>> => {
  const response = await getRequest(`/custodian_users`);

  return handleJsonResponse(response, options);
};
