"use server";

import { FeatureFlagsResponse } from "@/services/feature_flags/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<Paged<FeatureFlagsResponse>>> => {
  const response = await getRequest(`/features`);

  return handleJsonResponse(response, options);
};
