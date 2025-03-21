import { ResponseMessageType } from "@/consts/requests";
import { ResponseEmptyError } from "@/types/query";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getAccessToken } from "@/utils/auth";

async function getHeadersWithAuthorization(headers?: HeadersInit) {
  const accessToken = await getAccessToken();

  return {
    ...(accessToken && {
      Authorization: `Bearer ${accessToken}`,
    }),
    ...headers,
  };
}

function handleResponseError(
  response: Response | ResponseEmptyError,
  options?: ResponseOptions
) {
  if (!response?.ok) {
    if (!options) {
      return new Error(`${response?.status}Error`).message;
    }

    return new Error(
      response?.status === 401
        ? options["401"]?.message
        : response?.status === 409
          ? options["409"]?.message
          : options.error?.message
    ).message;
  }

  return null;
}

function handleDataError<T>(data: ResponseJson<T>, options?: ResponseOptions) {
  if (
    data.message &&
    data.message !== ResponseMessageType.SUCCESS &&
    !options?.suppressThrow
  ) {
    return new Error(options?.error?.message || "responseError");
  }

  return null;
}

async function handleJsonResponse(
  response: Response | ResponseEmptyError,
  options?: ResponseOptions
) {
  try {
    const responseError = handleResponseError(response, options);

    if (!options?.suppressThrow && responseError)
      return Promise.reject(responseError);

    const data = await response.json();
    const dataError = handleDataError(data, options);

    if (!options?.suppressThrow && dataError) return Promise.reject(dataError);

    return Promise.resolve({
      ...data,
      status: response.status,
    });
  } catch (_) {
    return Promise.resolve({
      ...createEmptyErrorJson(),
      status: response.status,
    });
  }
}

function createEmptyErrorJson() {
  return {
    message: "failed",
    data: null,
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
  handleResponseError,
};
