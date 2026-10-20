"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export interface PostOrganisationSroInvitePayload {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  department_id?: number;
}

// Invites someone new to be the organisation's SRO. The current SRO keeps the role until the
// invitee claims their account. Responds 409 if the email already belongs to a user.
export default async (
  organisationId: number,
  payload: PostOrganisationSroInvitePayload,
  options?: ResponseOptions
): Promise<ResponseJson<number>> => {
  const response = await postRequest(
    `/organisations/${organisationId}/sro/invite`,
    payload
  );

  return handleJsonResponse(response, options);
};
