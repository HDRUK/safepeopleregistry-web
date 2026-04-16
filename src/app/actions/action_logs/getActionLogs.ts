"use server";

import { ResponseJson, ResponseOptions } from "@/types/requests";
import { ActionLog, ActionLogEntity } from "@/types/logs";
import { getRequest } from "@/services/requests";
import { handleJsonResponse } from "@/services/requestHelpers";

export default async (
  userId: number,
  entity: ActionLogEntity,
  options: ResponseOptions
): Promise<ResponseJson<ActionLog[]>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/${entity}s/${userId}/action_log`
  );

  return handleJsonResponse(response, options);
};
