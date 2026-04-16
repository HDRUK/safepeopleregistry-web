"use server";

import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "@/services/requestHelpers";
import { deleteRequest } from "@/services/requests";

export default async (
  custodianId: number,
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(
    `/custodian_approvals/${custodianId}/projectUsers/${id}`
  );

  return handleJsonResponse(response, options);
};
