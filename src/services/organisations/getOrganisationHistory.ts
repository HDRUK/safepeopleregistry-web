import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetOrganisationsHistoryResponse } from "./types";

export default async (
  id: string | number,
  searchParams: Record<string, string | number | undefined>,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetOrganisationsHistoryResponse>>> => {
  const response = await getRequest(
    `/organisations/${id}/history${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
