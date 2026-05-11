import getNotifications from "@/app/actions/notifications/getNotifications";
import { NOTIFICATIONS_PER_PAGE } from "@/consts/notifications";

export default function getNotificationsQuery(userId: number) {
  return {
    queryKey: ["getUserNotifications", userId],
    queryFn: ({ pageParam }) =>
      getNotifications(
        userId as number,
        { page: pageParam, per_page: NOTIFICATIONS_PER_PAGE },
        {
          error: {
            message: "getNotificationsError",
          },
        }
      ),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { last_page, current_page } = lastPage.data;
      return current_page < last_page ? current_page + 1 : undefined;
    },
  };
}
