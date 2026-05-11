"use server";

import { EmploymentsResponse } from "@/services/employments/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<EmploymentsResponse>> => {
  const response = await getRequest(`/employments/${id}`);

  return handleJsonResponse(response, options);
};
