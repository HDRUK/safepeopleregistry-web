import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianEntityModel from "@/app/actions/custodians/getCustodianEntityModel";
import { EntityType } from "./types";

export default function getCustodianEntityModelQuery(
  custodianId: number | undefined,
  entity_type: EntityType,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianEntityModel",
      custodianId,
      entity_type,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianEntityModel(
        queryKey[1] as number,
        queryKey[2] as EntityType,
        {
          error: {
            message: "getCustodianEntityModelError",
          },
          ...options?.responseOptions,
        }
      ),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getCustodianEntityModel>>>;
}
