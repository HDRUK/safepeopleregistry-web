import patchUserNotification from "@/app/actions/notifications/patchUserNotification";
import { NotificationPutType } from "./types";

export default function patchNotificationQuery(userId: number) {
  return {
    mutationKey: ["patchUserNotifications"],
    mutationFn: ({
      notificationId,
      type,
    }: {
      notificationId: string;
      type: NotificationPutType;
    }) =>
      patchUserNotification(userId as number, notificationId, type, {
        suppressThrow: true,
        error: {
          message: "patchNotificationError",
        },
      }),
  };
}
