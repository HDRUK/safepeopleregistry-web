import { QueryOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import putVerifyEmail from "./putVerifyEmail";
import { PutVerifyEmailParams } from "./types";

export default function putVerifyEmailQuery(options?: QueryOptions) {
  return createMutation<ResponseJson<string>, PutVerifyEmailParams, null>(
    {
      mutationKey: ["putVerifyEmail"],
      mutationFn: ({ params }) => {
        return putVerifyEmail(params.verificationCode);
      },
    },
    options
  );
}
