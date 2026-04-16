import { useMutation } from "@tanstack/react-query";
import {
  postCustodianUser,
  putCustodianUser,
} from "@/app/actions/custodian_users";
import { CustodianUser } from "../../types/application";

interface UseMutationCustodianWriteUserOptions {
  user: CustodianUser;
  custodianId: number;
}

export default function useMutationWriteCustodianUser({
  user,
  custodianId: custodian_id,
}: UseMutationCustodianWriteUserOptions) {
  return useMutation({
    mutationKey: ["updateCustodianUser"],
    mutationFn: (
      payload: Pick<
        CustodianUser,
        "id" | "first_name" | "last_name" | "email" | "permissions"
      >
    ) => {
      if (!user?.id) {
        return postCustodianUser(
          { custodian_id, ...payload },
          {
            error: { message: "createUserError" },
          }
        );
      }

      return putCustodianUser(
        user.id,
        {
          ...payload,
          custodian_id,
        },
        {
          error: { message: "updateUserError" },
        }
      );
    },
  });
}
