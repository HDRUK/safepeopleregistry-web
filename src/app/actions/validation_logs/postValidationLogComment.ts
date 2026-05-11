"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { PostValidationLogCommentPayload } from "@/services/validation_logs/types";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  payload: PostValidationLogCommentPayload,
  options?: ResponseOptions
): Promise<ResponseJson<Comment>> => {
  const response = await postRequest(`/validation_log_comments`, payload);
  return handleJsonResponse(response, options);
};
