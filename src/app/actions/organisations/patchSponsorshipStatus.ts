"use server";

import { PatchSponsorshipStatusPayload } from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { patchRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  organisationId: number,
  payload: PatchSponsorshipStatusPayload,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await patchRequest(
    `/organisations/${organisationId}/sponsorships/statuses`,
    payload
  );

  return handleJsonResponse(response, options);
};
