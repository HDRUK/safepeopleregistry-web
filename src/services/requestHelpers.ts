"use server";

import {
  handleResponseError,
  createEmptyErrorJson,
  handleDataError,
} from "@/services/requestHelpersUtils";
import { ResponseEmptyError } from "@/types/query";
import { ResponseOptions } from "@/types/requests";
import { getAccessToken } from "@/utils/auth";

async function getHeadersWithAuthorization(headers?: HeadersInit) {
  const accessToken = await getAccessToken();

  return {
    ...headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
}

async function handleJsonResponse(
  response: Response | ResponseEmptyError,
  options?: ResponseOptions
) {
  const responseError = handleResponseError(response, options);

  if (!options?.suppressThrow && responseError) {
    throw responseError;
  }

  let data;

  try {
    data = await response.json();
  } catch {
    data = createEmptyErrorJson();
  }

  const dataError = handleDataError(data, options);

  if (!options?.suppressThrow && dataError) {
    throw dataError;
  }

  return {
    ...data,
    status: response.status,
    ok: response.ok,
  };
}

async function createEmptyErrorResponse(
  status: number = 500
): Promise<ResponseEmptyError> {
  return Promise.resolve({
    ok: false,
    status,
    json: async () => createEmptyErrorJson(),
  });
}

export {
  createEmptyErrorResponse,
  getHeadersWithAuthorization,
  handleJsonResponse,
};
