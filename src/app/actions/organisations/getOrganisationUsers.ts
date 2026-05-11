"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { UsersResponse } from "@/services/users";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";

export default async (
  id: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<UsersResponse>>> => {
  const params = new URLSearchParams(
    Object.entries(searchParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );

  const response = await getRequest(
    `/organisations/${id}/users?${params.toString()}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
