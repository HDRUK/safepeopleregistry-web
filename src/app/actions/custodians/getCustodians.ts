"use server";

import { GetCustodiansResponse } from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodiansResponse>>> => {
  const response = await getRequest(`/custodians`, undefined);

  return handleJsonResponse(response, options);
};
