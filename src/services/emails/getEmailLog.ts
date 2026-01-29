import { Paged, ResponseJson, ResponseOptions } from "../../types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<string>>> => {
  const response = await getRequest(`/email_logs/${id}`);

  return handleJsonResponse(response, options);
};
