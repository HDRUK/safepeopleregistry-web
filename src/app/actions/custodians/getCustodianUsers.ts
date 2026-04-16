"use server";

import { GetCustodianUsersResponse } from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export default async (
  custodianId: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodianUsersResponse>>> => {
  const response = await getRequest(
    `/custodians/${custodianId}/custodian_users${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
