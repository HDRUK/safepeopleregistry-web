"use server";

import {
  PostCustodianProjectPayload,
  PostCustodianProjectResponse,
} from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  custodianId: number,
  payload: PostCustodianProjectPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostCustodianProjectResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/custodians/${custodianId}/projects`,
    payload
  );

  return handleJsonResponse(response, options);
};
