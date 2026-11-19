import useOrganisationInvite from "@/queries/useOrganisationInvite";
import {
  postAffiliationQuery,
  putAffiliationQuery,
} from "@/services/affiliations";
import { PostAffiliationPayload } from "@/services/affiliations/types";
import { User } from "@/types/application";
import { QueryState } from "@/types/form";
import { formatDBDateTime } from "@/utils/date";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

export interface UseSubmitAffiliationProps {
  user: User;
  onOrganisationInviteError?: (error: unknown) => void;
}

/**
 * Saves a user's affiliation from the affiliations form. When the user's Organisation
 * isn't listed, it is created and invited first.
 */
export default function useSubmitAffiliation({
  user,
  onOrganisationInviteError,
}: UseSubmitAffiliationProps) {
  const { mutateAsync: postAffiliation, ...postAffiliationQueryState } =
    useMutation(postAffiliationQuery(user));

  const { mutateAsync: putAffiliation, ...putAffiliationQueryState } =
    useMutation(putAffiliationQuery());

  const {
    queryState: inviteQueryState,
    handleSubmit: handleCreateAndInviteOrganisation,
    mutateOrganisationInvite,
  } = useOrganisationInvite({ onError: onOrganisationInviteError });

  const queryState = getCombinedQueryState(
    [inviteQueryState, postAffiliationQueryState, putAffiliationQueryState],
    false
  ) as QueryState;

  const submitAffiliation = useCallback(
    async (
      fields: PostAffiliationPayload,
      affiliationId?: number
    ): Promise<boolean> => {
      let organisation_id = fields?.organisation_id;

      if (!organisation_id) {
        const invitePayload = {
          organisation_name: fields.organisation_name as string,
          lead_applicant_email: fields.organisation_email,
        };
        organisation_id =
          await handleCreateAndInviteOrganisation(invitePayload);

        if (!organisation_id) return false;
      }

      const {
        organisation_name: _name,
        organisation_email: _email,
        ...restFields
      } = fields;

      const payload = {
        ...restFields,
        organisation_id,
        to: formatDBDateTime(fields.to),
        from: formatDBDateTime(fields.from),
      };

      if (affiliationId) {
        await putAffiliation({ affiliationId, payload });
      } else {
        await postAffiliation(payload);
      }

      return true;
    },
    [handleCreateAndInviteOrganisation, postAffiliation, putAffiliation]
  );

  return {
    submitAffiliation,
    queryState,
    postAffiliationQueryState,
    putAffiliationQueryState,
    inviteQueryState,
    mutateOrganisationInvite,
  };
}
