"use server";

import { GetSroDeclarationDetailsResponse } from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<GetSroDeclarationDetailsResponse>> => {
  const response = await getRequest(
    `/organisations/${id}/sro_declaration/details`,
    undefined
  );

  return handleJsonResponse(response, options);
};
