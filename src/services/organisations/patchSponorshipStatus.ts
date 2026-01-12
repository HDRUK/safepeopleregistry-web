import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { patchRequest } from "../requests";
import { PatchSponsorshipStatusPayload } from "./types";

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
