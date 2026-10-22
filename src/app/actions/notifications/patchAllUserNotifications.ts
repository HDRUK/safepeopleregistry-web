"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { patchRequest } from "@/services/requests";
import { ResponseOptions } from "@/types/requests";

export default async (userId: number, options: ResponseOptions) => {
  const response = await patchRequest(
    `/users/${userId}/notifications/read`,
    {}
  );

  return handleJsonResponse(response, options);
};
