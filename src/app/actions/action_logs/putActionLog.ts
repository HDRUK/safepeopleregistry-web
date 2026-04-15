"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ActionLog } from "@/types/logs";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<ActionLog>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/action_log/${id}?complete`,
    {}
  );

  return handleJsonResponse(response, options);
};
