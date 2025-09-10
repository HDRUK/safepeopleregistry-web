import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import { PutSystemApprovedPayload } from "./types";
import putOrganisationApproved from "./putOrganisationApproved";

type PutOrganisationApprovedMutationArgs = MutateWithArgs<
  { organisationId: number },
  PutSystemApprovedPayload
>;

export default function putOrganisationApprovedQuery(options?: QueryOptions) {
  return {
    mutationKey: [
      "putOrganisationApproved",
      ...(options?.queryKeySuffix || []),
    ],
    mutationFn: ({ params, payload }: PutOrganisationApprovedMutationArgs) => {
      return putOrganisationApproved(params.organisationId, payload, {
        error: { message: "putOrganisationApprovedError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putOrganisationApproved>>,
    Error,
    PutOrganisationApprovedMutationArgs
  >;
}
