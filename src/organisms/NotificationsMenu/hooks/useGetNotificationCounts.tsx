import { useQuery } from "@tanstack/react-query";
import getNotificationsCountsQuery from "@/services/notifications/getNotificationsCountsQuery";

const useGetNotificationsCount = (userId: number) =>
  useQuery(getNotificationsCountsQuery(userId));

export default useGetNotificationsCount;
