import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { MutationState } from "../../types/form";
import {
  postOrganisationInviteQuery,
  PostOrganisationUnclaimedBeforeSuperadminInvitationPayload,
  postOrganisationUnclaimedQuery,
  postOrganisationUnclaimedBeforeSuperadminInvitationQuery,
  postOrganisationInviteToContactSuperadminQuery,
  putOrganisationQuery,
} from "../../services/organisations";
import { getCombinedQueryState } from "../../utils/query";
import { useFeatures } from "@/components/FeatureProvider";
import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import { Organisation } from "@/types/application";

interface UseOrganisationInviteProps {
  organisation?: Organisation;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useOrganisationInvite({
  organisation: existingOrganisation,
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

  const {
    mutateAsync: mutateOrganisation,
    reset: resetOrganisation,
    ...putOrganisationQueryState
  } = useMutation(putOrganisationQuery());

  const handleSubmit = useCallback(
    async (
      organisation: PostOrganisationUnclaimedBeforeSuperadminInvitationPayload
    ): Promise<number | undefined> => {
      try {
        if (existingOrganisation) {
          const { id } = existingOrganisation;
          const { organisation_name, lead_applicant_email } = organisation;

          if (
            organisation_name !== existingOrganisation.organisation_name ||
            lead_applicant_email !== existingOrganisation.lead_applicant_email
          ) {
            await mutateOrganisation({
              params: { organisationId: id },
              payload: { organisation_name, lead_applicant_email },
            });
          }

          await mutateOrganisationInvite(id);

          onSuccess?.();

          return id;
        }

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
          payload: {},
        });

        onSuccess?.();

        return organisationId;
      } catch (_) {
        onError?.();

        return undefined;
      }
    },
    [
      existingOrganisation,
      shouldInviteSroDirectly,
      mutateOrganisation,
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
    resetOrganisation();
  }, [
    resetOrganisation,
    resetOrganisationUnclaimed,
    resetOrganisationUnclaimedBeforeSuperadminInvitation,
    resetOrganisationInvite,
    resetOrganisationInviteToContactSuperadmin,
  ]);

  let queryStates;

  if (existingOrganisation) {
    queryStates = [putOrganisationQueryState, postOrganisationInviteQueryState];
  } else if (shouldInviteSroDirectly) {
    queryStates = [
      postOrganisationUnclaimedQueryState,
      postOrganisationInviteQueryState,
    ];
  } else {
    queryStates = [
      postOrganisationUnclaimedBeforeSuperadminInvitationQueryState,
      postOrganisationInviteToContactSuperadminQueryState,
    ];
  }

  const queryState = getCombinedQueryState<MutationState>(queryStates);

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
