import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putOrganisation from "@/app/actions/organisations/putOrganisation";
import { assertOrganisationResponseOk } from "@/utils/organisationConflictError";
import { PutOrganisationPayload } from "./types";

type PutOrganisationMutationArgs = MutateWithArgs<
  { organisationId: number },
  PutOrganisationPayload
>;

export default function putOrganisationQuery(options?: QueryOptions) {
  return {
    mutationKey: ["putOrganisation", ...(options?.queryKeySuffix || [])],
    mutationFn: async ({ params, payload }: PutOrganisationMutationArgs) => {
      const responseOptions = {
        error: { message: "putOrganisationError" },
        ...options?.responseOptions,
        suppressThrow: true,
      };

      const response = await putOrganisation(
        params.organisationId,
        payload,
        responseOptions
      );

      return assertOrganisationResponseOk(
        response,
        responseOptions.error?.message ?? "putOrganisationError"
      );
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putOrganisation>>,
    Error,
    PutOrganisationMutationArgs
  >;
}
