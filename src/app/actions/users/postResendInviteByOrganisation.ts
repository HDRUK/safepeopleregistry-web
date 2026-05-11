"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await postRequest(
    `/pending_invites/organisation/${id}/resend_invite`
  );

  return handleJsonResponse(response, options);
};
