"use server";

import {
  PostProjectDetailsFromGatewayPayload,
  PostProjectDetailsFromGatewayResponse,
} from "@/services/project_details";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: PostProjectDetailsFromGatewayPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostProjectDetailsFromGatewayResponse>> => {
  const response = await postRequest(
    `/project_details/query_gateway_dur`,
    payload
  );

  return handleJsonResponse(response, options);
};
