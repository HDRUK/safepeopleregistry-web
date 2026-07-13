import deleteAccreditations from "@/app/actions/accreditations/deleteAccreditations";
import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";

export default function deleteAccreditationsQuery(
  // registryId: number,
  // id: number,
  options?: MutationOptions
) {
  return {
    mutationKey: [
      "deleteAccreditations",
      // registryId,
      // id,
      ...(options?.mutationKeySuffix || []),
    ],
    mutationFn: ({ id, registryId }: { id: number; registryId: number }) => {
      console.log(id, "id");
      console.log(registryId, "registryId2");
      return deleteAccreditations(id, registryId, {
        error: { message: "deleteAccreditations" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteAccreditations>>,
    Error
  >;
}
