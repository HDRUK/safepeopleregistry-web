import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import postProjectDetailsFromGateway from "@/app/actions/professional_registrations/postProjectDetailsFromGateway";
import { PostProjectDetailsFromGatewayPayload } from "./types";

export default function postProjectDetailsFromGatewayQuery(
  options?: MutationOptions
) {
  return {
    mutationKey: ["postProjectDetailsFromGateway"],
    mutationFn: (payload: PostProjectDetailsFromGatewayPayload) => {
      return postProjectDetailsFromGateway(payload, {
        error: { message: "postProjectDetailsFromGatewayError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof postProjectDetailsFromGateway>>,
    Error,
    PostProjectDetailsFromGatewayPayload
  >;
}
