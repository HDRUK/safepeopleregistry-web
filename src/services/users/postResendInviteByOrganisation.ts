import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { postRequest } from "../requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await postRequest(
    `/pending_invites/organisation/${id}/resend_invite`
  );

  return handleJsonResponse(response, options);
};
