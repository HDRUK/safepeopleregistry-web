import { ResponseMessageType } from "@/consts/requests";
import { ResponseEmptyError } from "@/types/query";
import { ResponseOptions, ResponseJson } from "@/types/requests";

function handleResponseError(
  response: Response | ResponseEmptyError,
  options?: ResponseOptions
): Error | null {
  if (!response?.ok) {
    if (!options) {
      return new Error(`${response?.status}Error`);
    }

    const statusKey = String(response.status) as keyof ResponseOptions;
    const errorEntry = options[statusKey];

    const message =
      typeof errorEntry === "object" && errorEntry?.message
        ? errorEntry?.message
        : options.error?.message;

    return new Error(message);
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

function createEmptyErrorJson() {
  return {
    message: "failed",
    data: null,
  };
}

export { handleDataError, createEmptyErrorJson, handleResponseError };
