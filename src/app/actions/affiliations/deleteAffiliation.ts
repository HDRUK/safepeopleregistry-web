"use server";

import { ResponseJson, ResponseOptions } from "@/types/requests";
import { deleteRequest } from "@/services/requests";
import { handleJsonResponse } from "@/services/requestHelpers";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(`/affiliations/${id}`);

  return handleJsonResponse(response, options);
};
