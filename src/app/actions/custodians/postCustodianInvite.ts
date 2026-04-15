"use server";

import { PostCustodianInviteResponse } from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<PostCustodianInviteResponse>> => {
  const response = await postRequest(`/custodians/${id}/invite`);

  return handleJsonResponse(response, options);
};
