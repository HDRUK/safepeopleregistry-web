"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { Rules } from "@/services/rules";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Rules[]>> => {
  const response = await getRequest(`/rules`);

  return handleJsonResponse(response, options);
};
