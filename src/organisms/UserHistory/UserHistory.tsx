import { useStore } from "@/data/store";
import { Box, CircularProgress } from "@mui/material";

import useDebounce from "@/hooks/useDebounce";

import { useEffect, useMemo } from "react";
import { UserHistorys } from "@/services/users";
import useElementScrollNearBottom from "@/hooks/useElementScrollNearBottom";
import useGetUserHistory from "./useGetUserHistory";
import { StyledMenuItem } from "../NotificationsMenu/NotificationsMenu.styles";
import { UserHistoryCard } from "./UserHistoryCard";

export default function UserHistory() {
  const user = useStore(store => store.getCurrentUser());
  const { elementRef, isNearBottom } = useElementScrollNearBottom();
  const [debouncedIsNearBottom, setDebouncedIsNearBottom] = useDebounce(
    isNearBottom,
    500
  );

  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    useGetUserHistory(user?.id as number);
    const userHistorys: UserHistorys[] = useMemo(
      () => data?.pages.flatMap(page => page.data) ?? [],
      [data]
    );

  useEffect(() => {
    if (debouncedIsNearBottom) {
      fetchNextPage();
      setDebouncedIsNearBottom(false);
    }
  }, [debouncedIsNearBottom, fetchNextPage, setDebouncedIsNearBottom]);

  if (isFetching && !userHistorys.length) {
    return (
      <StyledMenuItem>
        <CircularProgress sx={{ mx: "auto" }} />
      </StyledMenuItem>
    );
  }

  return (
    <Box
      sx={{ gap: 2, display: "flex", flexDirection: "column", height: "100%" }}
      ref={elementRef}>
      {userHistorys.map(history => (
        <UserHistoryCard key={history.id} history={history} />
      ))}

      {isFetching && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
