import { MutationOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import getEmailLog from "./getEmailLog";

export default function getEmailLogQuery(options?: MutationOptions) {
  return createMutation<ResponseJson<string>, { id: number }, null>(
    {
      mutationKey: ["getEmailLog"],
      mutationFn: ({ params }) => {
        return getEmailLog(params.id);
      },
    },
    options
  );
}
