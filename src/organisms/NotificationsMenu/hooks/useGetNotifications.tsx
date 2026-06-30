import { useInfiniteQuery } from "@tanstack/react-query";
import getNotificationsQuery from "@/services/notifications/getNotificationsQuery";

const useGetNotifications = (userId: number) => {
  return useInfiniteQuery(getNotificationsQuery(userId));
};

export default useGetNotifications;
