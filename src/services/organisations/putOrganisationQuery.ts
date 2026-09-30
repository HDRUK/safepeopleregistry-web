import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putOrganisation from "@/app/actions/organisations/putOrganisation";
import { PutOrganisationPayload } from "./types";

type PutOrganisationMutationArgs = MutateWithArgs<
  { organisationId: number },
  PutOrganisationPayload
>;

export default function putOrganisationQuery(options?: QueryOptions) {
  return {
    mutationKey: ["putOrganisation", ...(options?.queryKeySuffix || [])],
    mutationFn: ({ params, payload }: PutOrganisationMutationArgs) => {
      return putOrganisation(params.organisationId, payload, {
        error: { message: "putOrganisationError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putOrganisation>>,
    Error,
    PutOrganisationMutationArgs
  >;
}
