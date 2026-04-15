"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { UsersResponse } from "@/services/users";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export default async (
  searchParams: Record<string, string | number | undefined>,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<UsersResponse>>> => {
  const response = await getRequest(
    `/pending_invites${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
