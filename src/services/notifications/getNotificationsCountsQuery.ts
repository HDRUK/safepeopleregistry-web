import getNotificationsCounts from "@/app/actions/notifications/getNotificationsCounts";

export default function getNotificationsCountsQuery(userId: number) {
  return {
    queryKey: ["getNotificationsCounts", userId],
    queryFn: ({ queryKey }) =>
      getNotificationsCounts(queryKey[1] as number, {
        error: {
          message: "getNotificationsCountsError",
        },
      }),
    enabled: true,
    refetchInterval: 60000,
  };
}
