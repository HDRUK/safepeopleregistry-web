"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { PutEmailByInvitePayload } from "@/services/users";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  inviteCode: string,
  payload: PutEmailByInvitePayload,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await putRequest(
    `/users/pending_invites/claim_email/${inviteCode}`,
    payload
  );

  return handleJsonResponse(response, options);
};
