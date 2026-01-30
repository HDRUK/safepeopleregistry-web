import { MutationOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import putResendEmail from "./putResendEmail";

export default function putResendEmailQuery(options?: MutationOptions) {
  return createMutation<ResponseJson<string>, { id: number }, null>(
    {
      mutationKey: ["putResendEmail"],
      mutationFn: ({ params }) => {
        return putResendEmail(params.id);
      },
    },
    options
  );
}
