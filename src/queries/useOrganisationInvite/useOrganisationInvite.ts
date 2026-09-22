import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { MutationState } from "../../types/form";
import {
  postOrganisationInviteQuery,
  PostOrganisationUnclaimedPayload,
  postOrganisationUnclaimedQuery,
  postOrganisationInviteToContactSuperadminQuery,
} from "../../services/organisations";
import { getCombinedQueryState } from "../../utils/query";
import { useFeatures } from "@/components/FeatureProvider";
import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";

interface UseOrganisationInviteProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useOrganisationInvite({
  onSuccess,
  onError,
}: UseOrganisationInviteProps = {}) {
  console.log("useOrganisationInvite called");
  const { isSroRequirementEnabled } = useFeatures();

  const storedUser = useStore(store => store.getUser());

  const {
    mutateAsync: mutateOrganisationUnclaimed,
    reset: resetOrganisationUnclaimed,
    ...postOrganisationUnclaimedQueryState
  } = useMutation(postOrganisationUnclaimedQuery());

  const {
    mutateAsync: mutateOrganisationInvite,
    reset: resetOrganisationInvite,
    ...postOrganisationInviteQueryState
  } = useMutation(postOrganisationInviteQuery());

  const {
    mutateAsync: mutateOrganisationInviteToContactSuperadmin,
    reset: resetOrganisationInviteToContactSuperadmin,
    ...postOrganisationInviteToContactSuperadminQueryState
  } = useMutation(postOrganisationInviteToContactSuperadminQuery());

  const handleSubmit = useCallback(
    async (organisation: PostOrganisationUnclaimedPayload) => {
      try {
        const { data: id } = await mutateOrganisationUnclaimed(organisation);

        if (
          isSroRequirementEnabled ||
          storedUser?.user_group === UserGroup.ADMINS
        ) {
          // only invite the user if the SRO requirement is enabled or the user is an admin
          await mutateOrganisationInvite(id);
        } else {
          // otherwise (if an email has been provided) send an email to the user asking them to email superadmin to create an organisation
          if (organisation.lead_applicant_email) {
            // results = await mutateCustodianUserInvite({
            //   organisationId: organisationId as number,
            //   payload,
            // });
            await mutateOrganisationInviteToContactSuperadmin({
              organisationId: id,
              payload: {
                email: organisation.lead_applicant_email,
              },
            });
          }
          // send notification to superadmin that a new organisation has been created and needs to be contacted
        }

        onSuccess?.();
        return id;
      } catch (_) {
        onError?.();
        return undefined;
      }
    },
    []
  );

  const queryState = getCombinedQueryState<MutationState>([
    postOrganisationUnclaimedQueryState,
    postOrganisationInviteQueryState,
    postOrganisationInviteToContactSuperadminQueryState,
  ]);

  return useMemo(
    () => ({
      queryState: {
        ...queryState,
        reset: () => {
          resetOrganisationUnclaimed();
          resetOrganisationInvite();
          resetOrganisationInviteToContactSuperadmin();
        },
      },
      data: postOrganisationUnclaimedQueryState.data,
      handleSubmit,
      mutateOrganisationUnclaimed,
      mutateOrganisationInvite,
    }),
    [queryState]
  );
}
