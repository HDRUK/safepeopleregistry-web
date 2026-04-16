"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { UserResponse } from "@/services/users";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: string | number,
  options?: ResponseOptions
): Promise<ResponseJson<UserResponse>> => {
  const response = await getRequest(`/users/${id}`);

  return handleJsonResponse(response, options);
};
