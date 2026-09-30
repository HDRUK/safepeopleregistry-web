import getOrganisationSroDeclaration from "@/app/actions/organisations/getOrganisationSroDeclaration";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getOrganisationSroDeclarationQuery(
  organisationId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getOrganisationSroDeclaration",
      organisationId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) => {
      return getOrganisationSroDeclaration(queryKey[1] as number, {
        error: {
          message: "getOrganisationSroDeclarationError",
        },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getOrganisationSroDeclaration>>>;
}
