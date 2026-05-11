import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putSubsidiary from "@/app/actions/subsidiaries/putSubsidiary";
import { PutSubsidiaryPayload } from "./types";

type PutSubsidiaryMutationArgs = MutateWithArgs<
  { organisationId: number; subsidiaryId: number },
  PutSubsidiaryPayload
>;

export default function putSubsidiaryQuery(options?: QueryOptions) {
  return {
    mutationKey: ["putSubsidiary", ...(options?.queryKeySuffix || [])],
    mutationFn: ({ params, payload }: PutSubsidiaryMutationArgs) => {
      return putSubsidiary(
        params.subsidiaryId,
        params.organisationId,
        payload,
        {
          error: { message: "putSubsidiaryError" },
          ...options?.responseOptions,
        }
      );
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putSubsidiary>>,
    Error,
    PutSubsidiaryMutationArgs
  >;
}
