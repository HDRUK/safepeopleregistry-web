"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ValidationLog } from "@/types/logs";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  custodianId: number,
  organisationId: number,
  options: ResponseOptions
): Promise<ResponseJson<ValidationLog[]>> => {
  const response = await getRequest(
    `/custodians/${custodianId}/organisations/${organisationId}/validation_logs`
  );

  return handleJsonResponse(response, options);
};
