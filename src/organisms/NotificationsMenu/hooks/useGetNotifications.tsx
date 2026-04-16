import { useInfiniteQuery } from "@tanstack/react-query";
import getNotificationsQuery from "@/services/notifications/getNotificationsQuery";

const useGetNotifcations = (userId: number) => {
  return useInfiniteQuery(getNotificationsQuery(userId));
};

export default useGetNotifcations;
