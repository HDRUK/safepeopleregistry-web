"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { PendingInviteResponse } from "@/services/users";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  inviteCode: string,
  options?: ResponseOptions
): Promise<ResponseJson<PendingInviteResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_SERVER_URL}/users/pending_invites/invite_code/${inviteCode}`
  );

  return handleJsonResponse(response, options);
};
