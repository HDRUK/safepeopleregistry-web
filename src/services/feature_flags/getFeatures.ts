import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { FeatureFlagsResponse } from "./types";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<Paged<FeatureFlagsResponse>>> => {
  const response = await getRequest(`/features`);

  return handleJsonResponse(response, options);
};
