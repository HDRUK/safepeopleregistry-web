import putUserNotification from "@/app/actions/notifications/putUserNotification";
import { NotificationPutType } from "./types";

export default function putNotificationQuery(userId: number) {
  return {
    mutationKey: ["putUserNotifications"],
    mutationFn: ({
      notificationId,
      type,
    }: {
      notificationId: string;
      type: NotificationPutType;
    }) =>
      putUserNotification(userId as number, notificationId, type, {
        suppressThrow: true,
        error: {
          message: "putNotificationError",
        },
      }),
  };
}
