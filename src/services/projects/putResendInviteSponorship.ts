import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { patchRequest } from "../requests";

export default async (
  organisationId: number,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await patchRequest(
    `/organisations/${organisationId}/resendInvite`
  );

  return handleJsonResponse(response, options);
};
