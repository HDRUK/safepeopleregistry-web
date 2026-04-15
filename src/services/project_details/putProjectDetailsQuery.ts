import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import { PutProjectDetailsPayload } from "./types";
import putProjectDetails from "@/app/actions/professional_registrations/putProjectDetails";

type PutProjectDetailsMutationArgs = MutateWithArgs<
  { id: number },
  PutProjectDetailsPayload
>;

export default function putProjectDetailsQuery(options?: QueryOptions) {
  return {
    mutationKey: ["putProjectDetails", ...(options?.queryKeySuffix || [])],
    mutationFn: ({ params, payload }: PutProjectDetailsMutationArgs) => {
      return putProjectDetails(params.id, payload, {
        error: { message: "putProjectDetailsError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putProjectDetails>>,
    Error,
    PutProjectDetailsMutationArgs
  >;
}
