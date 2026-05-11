"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { UserProjectsResponse } from "@/services/users";
import { SearchParams } from "@/types/query";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export default async (
  id: string | number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<UserProjectsResponse>>> => {
  const response = await getRequest(
    `/users/${id}/projects${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
