import { USER_HISTORY_PER_PAGE } from "@/consts/history";
import getUserHistory from "@/services/users/getUserHistory";

export default function getUserHistoryQuery(userId: number) {
  return {
    queryKey: ["getUserHistory", userId],
    queryFn: ({ pageParam }) =>
      getUserHistory(
        userId,
        { page: pageParam, per_page: USER_HISTORY_PER_PAGE },
        {
          error: {
            message: "getUserHistoryError",
          },
        }
      ),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { last_page, current_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
  };
}
