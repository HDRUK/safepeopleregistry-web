"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { UpdatePermissonsPayload, PutUserResponse } from "@/services/users";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: UpdatePermissonsPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutUserResponse>> => {
  const response = await postRequest(`/users/permissions`, payload);

  return handleJsonResponse(response, options);
};
