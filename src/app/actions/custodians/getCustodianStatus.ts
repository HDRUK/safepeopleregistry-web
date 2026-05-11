"use server";

import { GetCustodianStatusResponse } from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  custodianId: number,
  projectUserId: number,
  options: ResponseOptions
): Promise<ResponseJson<GetCustodianStatusResponse>> => {
  const response = await getRequest(
    `/custodians/${custodianId}/projectUsers/${projectUserId}/statuses`
  );

  return handleJsonResponse(response, options);
};
