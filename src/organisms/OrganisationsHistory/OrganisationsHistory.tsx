import { useStore } from "@/data/store";
import { Box, CircularProgress } from "@mui/material";

import useInfiniteNext from "@/hooks/useInfiniteNext";
import { OrganisationsHistorys } from "@/services/organisations";
import { useMemo } from "react";
import { StyledMenuItem } from "../NotificationsMenu/NotificationsMenu.styles";
import OrganisationsHistoryCard from "./OrganisationsHistoryCard";
import useGetOrganisationHistory from "./useGetOrganisationsHistory";

export default function OrganisationHistory() {
  const organisation = useStore(store => store.getCurrentOrganisation());

  const { data, fetchNextPage, isFetching } = useGetOrganisationHistory(
    organisation?.id as number
  );

  const { elementRef } = useInfiniteNext({
    fetchNextPage,
  });

  const organisationHistorys: OrganisationsHistorys[] = useMemo(
    () => data?.pages.flatMap(page => page.data) ?? [],
    [data]
  );

  if (isFetching && !organisationHistorys.length) {
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
      {organisationHistorys.map(history => (
        <OrganisationsHistoryCard key={history.id} history={history} />
      ))}

      {isFetching && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
