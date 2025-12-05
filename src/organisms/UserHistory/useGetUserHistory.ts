import { useInfiniteQuery } from "@tanstack/react-query";
import getUserHistoryQuery from "@/services/users/getUserQueryHistory";

const useGetUserHistory = (userId: number) => {
  return useInfiniteQuery(getUserHistoryQuery(userId));
};

export default useGetUserHistory;
