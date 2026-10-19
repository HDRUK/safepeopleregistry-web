import postOrganisationUnclaimed from "@/app/actions/organisations/postOrganisationUnclaimed";
import { assertOrganisationResponseOk } from "@/utils/organisationConflictError";
import { PostOrganisationUnclaimedPayload } from "./types";

export default function postOrganisationUnclaimedQuery() {
  return {
    mutationKey: ["postOrganisationUnclaimed"],
    mutationFn: async (payload: PostOrganisationUnclaimedPayload) => {
      const response = await postOrganisationUnclaimed(payload, {
        suppressThrow: true,
        error: { message: "postOrganisationUnclaimedError" },
      });

      return assertOrganisationResponseOk(
        response,
        "postOrganisationUnclaimedError"
      );
    },
  };
}
