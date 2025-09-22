import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PutUserPayload, PutUserResponse } from "./types";

export default async (
  id: number,
  payload: PutUserPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutUserResponse>> => {
  const response = await putRequest(`/users/${id}`, payload);

  return handleJsonResponse(response, options);
};
