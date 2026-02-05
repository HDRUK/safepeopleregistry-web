import { MutationOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import putChangeEmail from "./putChangeEmail";
import { PutChangeEmailParams, PutChangeEmailPayload } from "./types";

export default function putChangeEmailQuery(options?: MutationOptions) {
  return createMutation<
    ResponseJson<null>,
    PutChangeEmailParams,
    PutChangeEmailPayload
  >(
    {
      mutationKey: ["putChangeEmail"],
      mutationFn: ({ payload, params }, responseOptions) => {
        return putChangeEmail(params.id, payload, responseOptions);
      },
    },
    options
  );
}
