"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { patchRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  organisationId: number,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await patchRequest(
    `/organisations/${organisationId}/resendInvite`
  );

  return handleJsonResponse(response, options);
};
