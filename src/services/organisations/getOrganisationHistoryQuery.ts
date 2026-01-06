import { HISTORY_PER_PAGE } from "@/consts/history";
import { getNextPageParam } from "@/utils/query";
import getOrganisationHistory from "./getOrganisationHistory";

export default function getUserHistoryQuery(organisationId: number) {
  return {
    queryKey: ["getOrganisationHistory", organisationId],
    queryFn: ({ pageParam }) =>
      getOrganisationHistory(
        organisationId,
        { page: pageParam, per_page: HISTORY_PER_PAGE },
        {
          error: {
            message: "getOrganisationHistoryError",
          },
        }
      ),
    initialPageParam: 1,
    getNextPageParam,
  };
}
