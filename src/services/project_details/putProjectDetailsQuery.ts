import { MutateWithArgs, QueryOptions } from "../../types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putProjectDetails from "./putProjectDetails";
import { PutProjectDetailsPayload } from "./types";

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
