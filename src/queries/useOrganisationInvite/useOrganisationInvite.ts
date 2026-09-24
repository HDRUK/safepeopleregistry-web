import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { MutationState } from "../../types/form";
import {
  postOrganisationInviteQuery,
  PostOrganisationUnclaimedBeforeSuperadminInvitationPayload,
  postOrganisationUnclaimedQuery,
  postOrganisationUnclaimedBeforeSuperadminInvitationQuery,
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
  const { isSroRequirementEnabled } = useFeatures();

  const storedUser = useStore(store => store.getUser());

  const shouldInviteSroDirectly =
    isSroRequirementEnabled || storedUser?.user_group === UserGroup.ADMINS;

  const {
    mutateAsync: mutateOrganisationUnclaimed,
    reset: resetOrganisationUnclaimed,
    ...postOrganisationUnclaimedQueryState
  } = useMutation(postOrganisationUnclaimedQuery());

  const {
    mutateAsync: mutateOrganisationUnclaimedBeforeSuperadminInvitation,
    reset: resetOrganisationUnclaimedBeforeSuperadminInvitation,
    ...postOrganisationUnclaimedBeforeSuperadminInvitationQueryState
  } = useMutation(postOrganisationUnclaimedBeforeSuperadminInvitationQuery());

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
    async (
      organisation: PostOrganisationUnclaimedBeforeSuperadminInvitationPayload
    ): Promise<number | undefined> => {
      try {
        if (shouldInviteSroDirectly) {
          const { organisation_name, lead_applicant_email } = organisation;

          if (!lead_applicant_email) {
            // /organisations/unclaimed creates the Organisation already invited,
            // so it has to know who to invite. Every form that reaches this
            // branch makes the address mandatory - see the caveat in
            // InviteUser, where an admin with SroRequirementEnabled off does not.
            throw new Error(
              "A lead applicant email address is required to invite an Organisation directly"
            );
          }

          const { data: organisationId } = await mutateOrganisationUnclaimed({
            organisation_name,
            lead_applicant_email,
          });

          await mutateOrganisationInvite(organisationId);

          onSuccess?.();

          return organisationId;
        }

        // Nobody is invited here: the Organisation is created without a state,
        // and the superadmin is notified to go and make contact. If an address
        // was supplied, the invitee is additionally emailed asking them to get
        // in touch with the superadmin.
        const { data: organisationId } =
          await mutateOrganisationUnclaimedBeforeSuperadminInvitation(
            organisation
          );

        await mutateOrganisationInviteToContactSuperadmin({
          organisationId,
          payload: {
            email: organisation.lead_applicant_email,
          },
        });

        onSuccess?.();

        return organisationId;
      } catch (_) {
        onError?.();

        return undefined;
      }
    },
    [
      shouldInviteSroDirectly,
      mutateOrganisationUnclaimed,
      mutateOrganisationUnclaimedBeforeSuperadminInvitation,
      mutateOrganisationInvite,
      mutateOrganisationInviteToContactSuperadmin,
      onSuccess,
      onError,
    ]
  );

  const reset = useCallback(() => {
    resetOrganisationUnclaimed();
    resetOrganisationUnclaimedBeforeSuperadminInvitation();
    resetOrganisationInvite();
    resetOrganisationInviteToContactSuperadmin();
  }, [
    resetOrganisationUnclaimed,
    resetOrganisationUnclaimedBeforeSuperadminInvitation,
    resetOrganisationInvite,
    resetOrganisationInviteToContactSuperadmin,
  ]);

  const queryState = getCombinedQueryState<MutationState>(
    shouldInviteSroDirectly
      ? [postOrganisationUnclaimedQueryState, postOrganisationInviteQueryState]
      : [
          postOrganisationUnclaimedBeforeSuperadminInvitationQueryState,
          postOrganisationInviteToContactSuperadminQueryState,
        ]
  );

  return useMemo(
    () => ({
      queryState: {
        ...queryState,
        reset,
      },
      handleSubmit,
      mutateOrganisationUnclaimed,
      mutateOrganisationInvite,
    }),
    [
      queryState,
      reset,
      handleSubmit,
      mutateOrganisationUnclaimed,
      mutateOrganisationInvite,
    ]
  );
}
