import { UserGroup } from "@/consts/user";
import { User } from "@/types/application";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  postClaimUser,
  PostClaimUserPayload,
  postRegister,
  PostRegisterPayload,
} from "../../services/auth";
import {
  postOrganisationNewAccount,
  PostOrganisationNewAccountPayload,
  putOrganisation,
  PutOrganisationPayload,
} from "../../services/organisations";
import { getCombinedQueryState } from "../../utils/query";

interface UseRegisterUserArgs {
  userGroup: UserGroup | null;
  unclaimedUser: Partial<User> | undefined | null;
}

export default function useRegisterUser({
  userGroup,
  unclaimedUser,
}: UseRegisterUserArgs) {
  const orgId = unclaimedUser?.organisation_id ?? null;

  const { mutateAsync: mutateRegisterNewUser, ...registerMutationState } =
    useMutation({
      mutationKey: ["createUser"],
      mutationFn: (payload: PostRegisterPayload) => {
        return postRegister(payload, {
          error: { message: "failedToRegister" },
        });
      },
    });

  const { mutateAsync: mutateClaimUser } = useMutation({
    mutationKey: ["claimUser"],
    mutationFn: (id: number) => {
      return postClaimUser(id, {
        error: { message: "claimUserError" },
      });
    },
  });

  const { mutateAsync: mutateAsyncOrganisation, ...organisationMutationState } =
    useMutation({
      mutationKey: ["putOrganisation", orgId],
      mutationFn: (payload: PutOrganisationPayload) => {
        return putOrganisation(orgId as number, payload, {
          error: { message: "putOrganisationError" },
        });
      },
    });

  const {
    mutateAsync: mutateAsyncRegisterNewOrganisation,
    ...organisationMutationStateNewAccount
  } = useMutation({
    mutationKey: ["postOrganisationNewAccount"],
    mutationFn: (payload: PostOrganisationNewAccountPayload) => {
      return postOrganisationNewAccount(payload, {
        error: { message: "postOrganisationNewAccountError" },
      });
    },
  });

  const queryState = getCombinedQueryState(
    [
      registerMutationState,
      organisationMutationState,
      organisationMutationStateNewAccount,
    ],
    false
  );

  const handleRegister = async (user: User) => {
    if (!userGroup || queryState.isLoading) return;

    Cookies.remove("account_type");
    Cookies.remove("invite_code");

    const hasUnclaimedOrg =
      userGroup === UserGroup.ORGANISATIONS && !!unclaimedUser;

    if (hasUnclaimedOrg) {
      // Claim invited user
      if (unclaimedUser?.id) {
        await mutateClaimUser(unclaimedUser.id);
        Cookies.remove("account_digi_ident");
      }

      // Set unclaimed org to claimed
      if (!unclaimedUser.is_delegate) {
        await mutateAsyncOrganisation({ unclaimed: 0 });
      }
    } else if (userGroup === UserGroup.ORGANISATIONS) {
      // No invite - Create new org
      await mutateAsyncRegisterNewOrganisation({
        organisation_name: `${user?.given_name} ${user?.family_name} Org`,
        lead_applicant_email: user?.email,
        first_name: user?.given_name,
        last_name: user?.family_name,
        unclaimed: 0,
      });
    } else {
      // No invite - Create user
      await mutateRegisterNewUser({
        account_type: userGroup,
      });
    }
  };

  return {
    handleRegister,
    ...queryState,
  };
}
