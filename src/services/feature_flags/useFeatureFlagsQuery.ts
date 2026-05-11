import getFeatures from "@/app/actions/feature_flags/getFeatures";
import { SearchDirections } from "@/consts/search";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";

interface GetFeatureFlagsQuery {}
export default function useFeatureFlagsQuery({
  ...restParams
}: GetFeatureFlagsQuery = {}) {
  const queryKey = ["getFeatureFlags"];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams: {
      sort: `name:${SearchDirections.ASC}`,
    },
    queryFn: () =>
      getFeatures({
        error: { message: `${queryKey}Error` },
      }),
    ...restParams,
  });
}
