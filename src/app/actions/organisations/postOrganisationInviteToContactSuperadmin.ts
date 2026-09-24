"use server";

import {
  PostOrganisationInviteToContactSuperadminPayload,
  PostOrganisationInviteToContactSuperadminResponse,
} from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  payload: PostOrganisationInviteToContactSuperadminPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostOrganisationInviteToContactSuperadminResponse>> => {
  const response = await postRequest(
    `/organisations/${id}/invite_to_contact_superadmin`,
    payload
  );

  return handleJsonResponse(response, options);
};
