import deleteTrainings from "@/app/actions/trainings/deleteTrainings";
import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";

export default function deleteTrainingsQuery(options?: MutationOptions) {
  return {
    mutationKey: ["deleteTrainings", ...(options?.mutationKeySuffix || [])],
    mutationFn: (id: number) => {
      return deleteTrainings(id, {
        error: { message: "deleteTrainings" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteTrainings>>,
    Error,
    number
  >;
}
