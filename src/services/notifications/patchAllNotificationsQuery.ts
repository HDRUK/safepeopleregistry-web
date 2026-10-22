import patchAllUserNotifications from "@/app/actions/notifications/patchAllUserNotifications";

export default function patchAllNotificationsQuery(userId: number) {
  return {
    mutationKey: ["patchAllUserNotifications"],
    mutationFn: ({}: {}) =>
      patchAllUserNotifications(userId as number, {
        suppressThrow: true,
        error: {
          message: "patchNotificationError",
        },
      }),
  };
}
