import deleteAccreditations from "@/app/actions/accreditations/deleteAccreditations";
import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";

export default function deleteAccreditationsQuery(
  registryId: number,
  options?: MutationOptions
) {
  return {
    mutationKey: [
      "deleteAccreditations",
      registryId,
      ...(options?.mutationKeySuffix || []),
    ],
    mutationFn: (id: number) =>
      deleteAccreditations(registryId, id, {
        error: { message: "deleteAccreditations" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteAccreditations>>,
    Error,
    number
  >;
}
