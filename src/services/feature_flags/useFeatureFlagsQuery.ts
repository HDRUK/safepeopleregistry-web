import { SearchDirections } from "@/consts/search";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import { FeatureFlagsResponse } from "./types";
import getFeatures from "./getFeatures";

export default function useFeatureFlagsQuery({
  ...restParams
}: FeatureFlagsResponse) {
  const queryKey = ["getFeatureFlags"];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams: {
      sort: `name:${SearchDirections.ASC}`,
    },
    queryFn: () =>
      getFeatures({
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...restParams,
  });
}
