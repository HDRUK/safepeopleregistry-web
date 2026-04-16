"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { UserResponse } from "@/services/users";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: string,
  options?: ResponseOptions
): Promise<ResponseJson<Partial<UserResponse>>> => {
  const response = await getRequest(`/users/identifier?digi_ident=${id}`);

  return handleJsonResponse(response, options);
};
