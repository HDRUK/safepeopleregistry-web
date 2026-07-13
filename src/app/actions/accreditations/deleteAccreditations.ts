"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { deleteRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  registryId: number,
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(
    `/accreditations/${id}/registries/${registryId}`
  );

  return handleJsonResponse(response, options);
};
