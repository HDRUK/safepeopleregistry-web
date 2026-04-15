"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { GetSystemConfigResponse } from "@/services/system_config/types";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<GetSystemConfigResponse>> => {
  const response = await getRequest(`/system_config`);

  return handleJsonResponse(response, options);
};
