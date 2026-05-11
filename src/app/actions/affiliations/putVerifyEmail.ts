"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResearcherAffiliation } from "@/types/application";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  verificationCode: string,
  options?: ResponseOptions
): Promise<ResponseJson<ResearcherAffiliation>> => {
  const response = await putRequest(
    `/affiliations/verify_email/${verificationCode}`
  );

  return handleJsonResponse(response, options);
};
