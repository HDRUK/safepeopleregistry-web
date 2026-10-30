"use server";

import { GetCustodianAccessRevocationsResponse } from "@/services/custodians/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export default async (
  custodianId: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodianAccessRevocationsResponse>>> => {
  const response = await getRequest(
    `/custodians/${custodianId}/access_revocations${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
