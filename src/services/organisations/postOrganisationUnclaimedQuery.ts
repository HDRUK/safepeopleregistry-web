import postOrganisationUnclaimed from "@/app/actions/organisations/postOrganisationUnclaimed";
import { OrganisationConflictError } from "@/utils/organisationConflictError";
import { PostOrganisationUnclaimedPayload } from "./types";

export default function postOrganisationUnclaimedQuery() {
  return {
    mutationKey: ["postOrganisationUnclaimed"],
    mutationFn: async (payload: PostOrganisationUnclaimedPayload) => {
      // suppressThrow returns failures as data. Errors thrown inside a server
      // action lose their message in production, so the 409 reason has to be
      // turned into an error here, on the client.
      const response = await postOrganisationUnclaimed(payload, {
        suppressThrow: true,
        error: { message: "postOrganisationUnclaimedError" },
      });

      if (response.status === 409) {
        throw new OrganisationConflictError(response.data);
      }

      if (!response.ok) {
        throw new Error("postOrganisationUnclaimedError");
      }

      return response;
    },
  };
}
