import { ResponseJson, ResponseOptions } from "../../types/requests";
import { getRequest, isServer } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { PendingInviteResponse } from "./types";

export default async (
  inviteCode: string,
  options?: ResponseOptions
): Promise<ResponseJson<PendingInviteResponse>> => {
  const response = await getRequest(
    `${isServer() ? process.env.NEXT_PUBLIC_API_V1_SERVER_URL : process.env.NEXT_PUBLIC_API_V1_URL}/users/pending_invites/invite_code/${inviteCode}`
  );

  return handleJsonResponse(response, options);
};
