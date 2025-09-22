import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";
import { PutEmailByInvitePayload } from "./types";

export default async (
  inviteCode: string,
  payload: PutEmailByInvitePayload,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  // Requires cookie rather than param
  const response = await putRequest(
    `/users/pending_invites/claim_email/${inviteCode}`,
    payload
  );

  return handleJsonResponse(response, options);
};
