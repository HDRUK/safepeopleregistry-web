"use server";

import { FileResponse } from "@/services/files";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<FileResponse>> => {
  const response = await getRequest(`/files/${id}`);

  return handleJsonResponse(response, options);
};
