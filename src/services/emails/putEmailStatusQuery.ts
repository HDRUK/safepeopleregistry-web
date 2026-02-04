import { MutationOptions, ResponseJson } from "../../types/requests";
import { createMutation } from "../../utils/query";
import putEmailStatus from "./putEmailStatus";

export default function putEmailStatusQuery(options?: MutationOptions) {
  return createMutation<ResponseJson<string>, { id: number }, null>(
    {
      mutationKey: ["putEmailStatus"],
      mutationFn: ({ params }) => {
        return putEmailStatus(params.id);
      },
    },
    options
  );
}
