import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";
import { PutChangeEmailPayload } from "./types";

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
