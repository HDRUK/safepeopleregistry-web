import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<string>> => {
  const response = await putRequest(`/email_logs/messages/${id}/status`);

  return handleJsonResponse(response, options);
};
