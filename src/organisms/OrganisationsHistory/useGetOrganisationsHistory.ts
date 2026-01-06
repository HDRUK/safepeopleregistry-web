import getOrganisationHistoryQuery from "@/services/organisations/getOrganisationHistoryQuery";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetUserHistory = (organisationId: number) => {
  return useInfiniteQuery(getOrganisationHistoryQuery(organisationId));
};

export default useGetUserHistory;
