import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PostUserInvitePayload, PostUserInviteResponse } from "./types";

export default async (
  payload: PostUserInvitePayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostUserInviteResponse>> => {
  const response = await postRequest(`/users/invite`, payload);

  return handleJsonResponse(response, options);
};
