import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianDecisionModel from "@/app/actions/custodians/getCustodianDecisionModel";
import { EntityType } from "./types";

export default function getCustodianDecisionModelQuery(
  custodianId: number | undefined,
  entity_type: EntityType,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianDecisionModel",
      custodianId,
      entity_type,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianDecisionModel(
        queryKey[1] as number,
        queryKey[2] as EntityType,
        {
          error: {
            message: "getCustodianDecisionModelError",
          },
          ...options?.responseOptions,
        }
      ),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getCustodianDecisionModel>>>;
}
