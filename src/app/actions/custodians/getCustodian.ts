"use server";

import { GetCustodianResponse } from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: string | number,
  options: ResponseOptions
): Promise<ResponseJson<GetCustodianResponse>> => {
  const response = await getRequest(`/custodians/${id}`);

  return handleJsonResponse(response, options);
};
