"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { UsersResponse } from "@/services/users";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<UsersResponse>> => {
  const response = await getRequest(
    `/organisations/${id}/delegates`,
    undefined
  );

  return handleJsonResponse(response, options);
};
