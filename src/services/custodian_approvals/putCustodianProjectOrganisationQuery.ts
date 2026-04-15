import putCustodianProjectOrganisation from "@/app/actions/custodian_approvals/putCustodianProjectOrganisation";
import { ChangeValidationStatusPayload } from "./types";

interface MutationArgs {
  params: { projectOrganisationId: number };
  payload: ChangeValidationStatusPayload;
}

export default function putCustodianProjectOrganisationQuery(
  custodianId: number
) {
  return {
    mutationKey: ["putCustodianProjectOrganisationQuery", custodianId],
    mutationFn: async ({ params, payload }: MutationArgs) => {
      const { projectOrganisationId } = params;
      return putCustodianProjectOrganisation(
        custodianId,
        projectOrganisationId,
        payload,
        {
          error: { message: "putCustodianProjectOrganisationError" },
        }
      );
    },
  };
}
