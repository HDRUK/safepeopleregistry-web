"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

// Resends the invited SRO's invitation with its existing code. Responds 404 if there is no
// pending SRO invitation.
export default async (
  organisationId: number,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await postRequest(
    `/organisations/${organisationId}/sro/resend_invite`
  );

  return handleJsonResponse(response, options);
};
