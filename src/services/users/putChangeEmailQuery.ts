import { QueryOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import putChangeEmail from "./putChangeEmail";
import { PutChangeEmailParams, PutChangeEmailPayload } from "./types";

export default function putChangeEmailQuery(options?: QueryOptions) {
  return createMutation<
    ResponseJson<null>,
    PutChangeEmailParams,
    PutChangeEmailPayload
  >(
    {
      mutationKey: ["putChangeEmail"],
      mutationFn: ({ payload, params }) => {
        return putChangeEmail(params.id, payload);
      },
    },
    options
  );
}
