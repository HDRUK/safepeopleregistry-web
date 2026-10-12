"use server";

import { postRegister, postClaimUser } from "@/app/actions/auth";
import {
  postOrganisationNewAccount,
  putOrganisation,
} from "@/app/actions/organisations";
import { UserGroup } from "@/consts/user";
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

  const orgId = unclaimedUser?.organisation_id ?? null;

  if (orgId) {
    // The API only lets an invitee claim the account their emailed invite code belongs to.
    const inviteCode = cookieStore.get("invite_code")?.value;

    if (!inviteCode) {
      throw new Error("No invite code to claim the account with");
    }

    await postClaimUser(unclaimedUser.id, inviteCode);

    // Cleared only once claimed, so a failed claim can be retried with the same invite.
    cookieStore.delete("account_type");
    cookieStore.delete("invite_code");
    cookieStore.delete("account_digi_ident");

    if (unclaimedUser.is_delegate || unclaimedUser.is_sro) {
      await putOrganisation(orgId, { unclaimed: 0 });
    }

    await setAcceptTCs(false, UserGroup.ORGANISATIONS);
  } else {
    cookieStore.delete("account_type");
    cookieStore.delete("invite_code");

    await registerUser(userGroup);

    await setAcceptTCs(false, UserGroup.USERS);
  }
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
