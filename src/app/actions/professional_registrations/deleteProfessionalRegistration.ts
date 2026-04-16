"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { deleteRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(`/professional_registrations/${id}`);

  return handleJsonResponse(response, options);
};
