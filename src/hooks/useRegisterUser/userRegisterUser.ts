import { useRouter } from "@/i18n/routing";
import { AccountType } from "@/types/accounts";
import { useMutation } from "@tanstack/react-query";
import { Auth, User } from "@/types/application";
import { getProfilePathByEntity } from "@/utils/redirects";
import Cookies from "js-cookie";
import {
  postClaimUser,
  postRegister,
  PostRegisterPayload,
  PostClaimUserPayload,
} from "../../services/auth";
import {
  postOrganisationNewAccount,
  PostOrganisationNewAccountPayload,
  putOrganisation,
  PutOrganisationPayload,
} from "../../services/organisations";
import { getCombinedQueryState } from "../../utils/query";

interface UseRegisterUserArgs {
  accountType: AccountType | null;
  unclaimedOrgAdmin: Partial<User> | null;
}

export default function useRegisterUser({
  accountType,
  unclaimedOrgAdmin,
}: UseRegisterUserArgs) {
  const router = useRouter();
  const orgId = unclaimedOrgAdmin?.organisation_id ?? null;

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
    mutationFn: (payload: PostClaimUserPayload) => {
      return postClaimUser(payload, {
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

  const handleRegister = async (user: Auth) => {
    if (!accountType) return;

    Cookies.remove("account_type");

    const hasUnclaimedOrg =
      accountType === AccountType.ORGANISATION && !!unclaimedOrgAdmin;

    if (hasUnclaimedOrg) {
      // Claim invited user
      if (unclaimedOrgAdmin?.registry_id) {
        await mutateClaimUser({ registry_id: unclaimedOrgAdmin.registry_id });
        Cookies.remove("account_digi_ident");
      }

      // Set unclaimed org to claimed
      await mutateAsyncOrganisation({ unclaimed: 0 });
    } else if (accountType === AccountType.ORGANISATION) {
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
        account_type: accountType,
      });
    }

    router.replace(getProfilePathByEntity(accountType));
  };

  return {
    handleRegister,
    ...getCombinedQueryState([
      registerMutationState,
      organisationMutationState,
      organisationMutationStateNewAccount,
    ]),
  };
}
