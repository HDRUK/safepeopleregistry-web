import { QueryOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import putEmailChange from "./putEmailChange";
import { PutEmailChangeParams, PutEmailChangePayload } from "./types";

export default function putEmailChangeQuery(options?: QueryOptions) {
  return createMutation<
    ResponseJson<string>,
    PutEmailChangeParams,
    PutEmailChangePayload
  >(
    {
      mutationKey: ["putEmailChange"],
      mutationFn: ({ payload, params }) => {
        return putEmailChange(params.id, payload.email);
      },
    },
    options
  );
}
