import getAffiliations from "@/app/actions/affiliations/getAffiliations";
import { PAGINATION_UPPER_LIMIT } from "@/consts/application";
import { isAffiliationInfoRequired } from "@/utils/affiliations";
import { useQuery } from "@tanstack/react-query";

const queryParams = { per_page: PAGINATION_UPPER_LIMIT };

export default function useIncompleteAffiliations(registryId?: number) {
  const { data, refetch } = useQuery({
    queryKey: ["getAffiliations", registryId, queryParams],
    queryFn: () =>
      getAffiliations(registryId as number, queryParams, {
        error: { message: "getAffiliationsError" },
      }),
    enabled: !!registryId,
  });

  return {
    incompleteAffiliations:
      data?.data?.data?.filter(isAffiliationInfoRequired) ?? [],
    refetch,
  };
}
