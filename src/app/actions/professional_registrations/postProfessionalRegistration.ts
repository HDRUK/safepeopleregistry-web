"use server";

import {
  PostProfessionalRegistrationPayload,
  PostProfessionalResgitrationResponse,
} from "@/services/professional_registrations/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  registryId: number,
  payload: PostProfessionalRegistrationPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostProfessionalResgitrationResponse>> => {
  const response = await postRequest(
    `/professional_registrations/registry/${registryId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
