"use server";

import { GetCustodianOrganisationsResponse } from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export default async function getCustodianOrganisations(
  custodianId: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodianOrganisationsResponse>>> {
  const response = await getRequest(
    `/custodian_approvals/${custodianId}/projectOrganisations${getSearchQuerystring(searchParams)}`
  );
  return handleJsonResponse(response, options);
}
