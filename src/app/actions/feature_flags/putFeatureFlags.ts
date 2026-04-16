"use server";

import { FeatureFlagsResponse } from "@/services/feature_flags/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<FeatureFlagsResponse>> => {
  const response = await putRequest(`/features/${id}/toggle`);

  return handleJsonResponse(response, options);
};
