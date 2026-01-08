import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";

export default async function putEmailChange(
  id: string,
  email: string,
  options?: ResponseOptions
): Promise<ResponseJson<string>> {
  const response = await putRequest(`/users/${id}/keycloak/update_email`, {
    email,
  });

  return handleJsonResponse(response, options);
}
