import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getOrganisation from "./getOrganisation";

export default function getOrganisationQuery(
  organisationId: number,
  options?: QueryOptions
) {
  const suspenseEnabled =
    options?.suspenseEnabled || options?.suspenseEnabled === undefined;

  return {
    queryKey: [
      "getOrganisation",
      organisationId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) => {
      return suspenseEnabled
        ? getOrganisation(queryKey[1] as number, {
            error: {
              message: "getOrganisationError",
            },
            ...options?.responseOptions,
          })
        : null;
    },
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getOrganisation>>>;
}
