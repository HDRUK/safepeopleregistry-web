"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

type NotificationCountResponse = {
  total: number;
  read: number;
  unread: number;
};

export default async (
  userId: number,
  options: ResponseOptions
): Promise<ResponseJson<NotificationCountResponse>> => {
  const response = await getRequest(
    `/users/${userId}/notifications/count`,
    undefined
  );

  return handleJsonResponse(response, options);
};
