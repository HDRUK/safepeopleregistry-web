"use server";

import { PostCustodianUserResponse } from "@/services/custodian_users";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<PostCustodianUserResponse>> => {
  const response = await postRequest(`/custodian_users/invite/${id}`);

  return handleJsonResponse(response, options);
};
