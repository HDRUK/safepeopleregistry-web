import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { GetAffiliationsResponse } from "./types";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async (
  registryId: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<GetAffiliationsResponse>>> => {
  const response = await getRequest(
    `/affiliations/${registryId}${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
