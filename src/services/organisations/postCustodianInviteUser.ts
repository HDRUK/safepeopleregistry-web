import { ResponseJson, ResponseOptions } from "@/types/requests";
import { postRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import {
  PostOrganisationInviteUserResponse,
  PostOrganisationInviteUserPayload,
} from "./types";

export default async (
  id: number,
  payload: PostOrganisationInviteUserPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostOrganisationInviteUserResponse>> => {
  const response = await postRequest(
    `/organisations/${id}/custodian_invite_user`,
    payload
  );

  return handleJsonResponse(response, options);
};
