"use server";

import { NotificationPutType } from "@/services/notifications/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseOptions } from "@/types/requests";

export default async (
  userId: number,
  notificationId: string,
  type: NotificationPutType,
  options: ResponseOptions
) => {
  const response = await putRequest(
    `/users/${userId}/notifications/${notificationId}/${type}`,
    {}
  );

  return handleJsonResponse(response, options);
};
