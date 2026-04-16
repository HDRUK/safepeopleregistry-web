"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { PutChangeEmailPayload } from "@/services/users";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  userId: string | number,
  payload: PutChangeEmailPayload,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await putRequest(
    `/users/${userId}/keycloak/update_email`,
    payload
  );

  return handleJsonResponse(response, options);
};
