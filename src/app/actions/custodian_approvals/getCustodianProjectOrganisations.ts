"use server";

import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { SearchParams } from "@/types/query";
import { getRequest } from "@/services/requests";
import { handleJsonResponse } from "@/services/requestHelpers";
import { GetCustodianProjectOrganisationsResponse } from "@/services/custodian_approvals/types";

export default async (
  id: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodianProjectOrganisationsResponse>>> => {
  const response = await getRequest(
    `/custodian_approvals/${id}/projectOrganisations${getSearchQuerystring(searchParams)}`
  );
  return handleJsonResponse(response, options);
};
