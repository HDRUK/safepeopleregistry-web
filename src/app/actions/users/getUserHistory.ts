"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { GetUserHistoryResponse } from "@/services/users";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

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
