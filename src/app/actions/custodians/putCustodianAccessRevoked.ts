"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  custodianId: number,
  projectUserId: number,
  options?: ResponseOptions
): Promise<ResponseJson<boolean>> => {
  const response = await putRequest(
    `/custodians/${custodianId}/access_revocations/${projectUserId}`
  );

  return handleJsonResponse(response, options);
};
