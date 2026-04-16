"use server";

import { FilePayload, FileResponse } from "@/services/files";
import { handleResponseError } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: FilePayload,
  options: ResponseOptions
): Promise<ResponseJson<FileResponse>> => {
  const response = await postRequest(`/files`, payload);

  const error = handleResponseError(response, options);

  if (error) return Promise.reject(error);

  const data = await response.json();

  return data;
};
