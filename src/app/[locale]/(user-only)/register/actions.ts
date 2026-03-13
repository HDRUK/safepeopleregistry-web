"use server";

import { UserGroup } from "@/consts/user";
import { postClaimUser, postRegister } from "@/services/auth";
import {
  postOrganisationNewAccount,
  putOrganisation,
} from "@/services/organisations";
import { User } from "@/types/application";
import { setAcceptTCs } from "@/utils/register";
import { cookies } from "next/headers";

async function registerUser(userGroup: UserGroup) {
  await postRegister(
    {
      account_type: userGroup,
      t_and_c_agreed: true,
    },
    {
      suppressThrow: true,
    }
  );

  await setAcceptTCs(false, userGroup);
}

async function registerOrganisation(tokenUser: Partial<User>) {
  await postOrganisationNewAccount({
    organisation_name: `${tokenUser.given_name} ${tokenUser.family_name} Org`,
    lead_applicant_email: tokenUser.email,
    first_name: tokenUser.given_name,
    last_name: tokenUser.family_name,
    unclaimed: 0,
    t_and_c_agreed: true,
  });

  await setAcceptTCs(false, UserGroup.ORGANISATIONS);
}

async function registerInvite(unclaimedUser: User, userGroup: UserGroup) {
  const cookieStore = await cookies();

  cookieStore.delete("account_type");
  cookieStore.delete("invite_code");

  const orgId = unclaimedUser?.organisation_id ?? null;

  const action = orgId
    ? (async () => {
        await postClaimUser(unclaimedUser.id);

        cookieStore.delete("account_digi_ident");

        if (!unclaimedUser.is_delegate) {
          await putOrganisation(orgId, { unclaimed: 0 });
        }

        await setAcceptTCs(false, UserGroup.ORGANISATIONS);
      })()
    : (async () => {
        await registerUser(userGroup);
        await setAcceptTCs(false, UserGroup.USERS);
      })();

  return await action;
}

async function acceptTCs(userGroup: UserGroup) {
  await setAcceptTCs(true, userGroup);
}

async function rejectTCs(userGroup: UserGroup) {
  await setAcceptTCs(false, userGroup);
}

export {
  acceptTCs,
  registerInvite,
  registerOrganisation,
  registerUser,
  rejectTCs,
};
