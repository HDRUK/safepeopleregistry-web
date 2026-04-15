import { UseMutationOptions } from "@tanstack/react-query";
import { MutateWithArgs, MutationOptions } from "@/types/requests";
import deleteSubsidiary from "@/app/actions/subsidiaries/deleteSubsidiary";

type DeleteSubsidiaryMutationArgs = MutateWithArgs<
  { organisationId: number; subsidiaryId: number },
  undefined
>;

export default function deleteSubsidiaryQuery(options?: MutationOptions) {
  return {
    mutationKey: ["deleteSubsidiary", ...(options?.mutationKeySuffix || [])],
    mutationFn: ({ params }: DeleteSubsidiaryMutationArgs) => {
      return deleteSubsidiary(params.subsidiaryId, params.organisationId, {
        error: { message: "deleteSubsidiaryError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteSubsidiary>>,
    Error,
    DeleteSubsidiaryMutationArgs
  >;
}
