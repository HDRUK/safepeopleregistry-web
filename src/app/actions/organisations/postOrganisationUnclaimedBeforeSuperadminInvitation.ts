"use server";

import { PostOrganisationUnclaimedBeforeSuperadminInvitationPayload } from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: PostOrganisationUnclaimedBeforeSuperadminInvitationPayload,
  options: ResponseOptions
): Promise<ResponseJson<number>> => {
  const response = await postRequest(
    `/organisations/unclaimed_before_superadmin_invitation`,
    payload
  );

  return handleJsonResponse(response, options);
};
