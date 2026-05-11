"use server";

import { GetProfessionalRegistrationsResponse } from "@/services/professional_registrations/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";

export default async (
  registry_id: number,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetProfessionalRegistrationsResponse>>> => {
  const response = await getRequest(
    `/professional_registrations/registry/${registry_id}`
  );

  return handleJsonResponse(response, options);
};
