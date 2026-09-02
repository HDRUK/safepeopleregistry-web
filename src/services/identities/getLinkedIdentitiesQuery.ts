import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getLinkedIdentities from "@/app/actions/identities/getLinkedIdentities";

export default function getLinkedIdentitiesQuery(
  userId?: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getLinkedIdentities",
      userId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: () =>
      getLinkedIdentities({
        error: { message: "getLinkedIdentitiesError" },
        ...options?.responseOptions,
      }),
    enabled: !!userId,
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getLinkedIdentities>>>;
}
