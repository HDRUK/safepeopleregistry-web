import { UseMutationOptions } from "@tanstack/react-query";
import { MutationOptions } from "@/types/requests";
import deleteAffiliation from "@/app/actions/affiliations/deleteAffiliation";

export default function deleteAffiliationQuery(options?: MutationOptions) {
  return {
    mutationKey: ["deleteAffiliation", ...(options?.mutationKeySuffix || [])],
    mutationFn: (id: number) => {
      return deleteAffiliation(id, {
        error: { message: "deleteAffiliationError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteAffiliation>>,
    Error,
    number
  >;
}
