import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetUserHistoryResponse } from "./types";

export default async (
  id: string | number,
  searchParams: Record<string, string | number | undefined>,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetUserHistoryResponse>>> => {
  const response = await getRequest(
    `/users/${id}/history${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
