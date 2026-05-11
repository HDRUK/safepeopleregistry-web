"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ValidationCheck } from "@/types/logs";
import { SearchParams } from "@/types/query";
import { ResponseOptions, ResponseJson } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export default async (
  custodianId: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<ValidationCheck[]>> => {
  const response = await getRequest(
    `/custodians/${custodianId}/validation_checks${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
