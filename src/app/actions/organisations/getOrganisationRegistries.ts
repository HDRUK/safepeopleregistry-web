"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { UsersResponse } from "@/services/users";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export default async (
  id: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<UsersResponse>>> => {
  const response = await getRequest(
    `/organisations/${id}/registries${getSearchQuerystring(searchParams)}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
