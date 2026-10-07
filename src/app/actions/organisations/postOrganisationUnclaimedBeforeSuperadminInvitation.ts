"use server";

import { PostOrganisationPayload } from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: PostOrganisationPayload,
  options: ResponseOptions
): Promise<ResponseJson<number>> => {
  const response = await postRequest(
    `/organisations/unclaimed_before_superadmin_invitation`,
    payload
  );

  return handleJsonResponse(response, options);
};
