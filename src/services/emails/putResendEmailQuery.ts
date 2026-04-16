import putResendEmail from "@/app/actions/emails/putResendEmail";
import { MutationOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";

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
