"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { deleteRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  organisationId: number,
  userId: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(
    `/organisations/${organisationId}/delegates/${userId}`
  );

  return handleJsonResponse(response, options);
};
