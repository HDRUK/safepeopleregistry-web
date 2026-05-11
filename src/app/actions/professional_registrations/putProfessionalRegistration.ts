"use server";

import { PostProfessionalRegistrationPayload } from "@/services/professional_registrations/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResearcherProfessionalRegistration } from "@/types/application";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  payload: PostProfessionalRegistrationPayload,
  options?: ResponseOptions
): Promise<ResponseJson<ResearcherProfessionalRegistration>> => {
  const response = await putRequest(
    `/professional_registrations/${id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
