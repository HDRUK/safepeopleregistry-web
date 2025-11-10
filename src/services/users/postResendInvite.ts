import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { postRequest } from "../requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await postRequest(`/users/invite/${id}`);

  return handleJsonResponse(response, options);
};
