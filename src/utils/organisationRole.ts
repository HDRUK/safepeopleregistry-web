import { OrganisationRole, UserGroup } from "@/consts/user";
import { Organisation, User } from "@/types/application";

type OrganisationRoleUser = Pick<
  User,
  "user_group" | "organisation_id" | "is_sro"
>;

/**
 * Mirrors User::organisationRole() in the API: is_sro takes precedence, any other
 * organisation user is a delegate, and users without an organisation have no role.
 */
function getOrganisationRole(
  user: OrganisationRoleUser
): OrganisationRole | null {
  if (
    user.user_group !== UserGroup.ORGANISATIONS ||
    user.organisation_id == null
  ) {
    return null;
  }

  return user.is_sro ? OrganisationRole.SRO : OrganisationRole.DELEGATE;
}

/**
 * Mirrors OrganisationPolicy::performSroRestrictedAction() in the API, for showing or
 * hiding controls only; the API enforces the rule. A delegate is only allowed when
 * has_sro is known to be false, so the result is false if has_sro was not loaded.
 */
function canPerformSroRestrictedAction(
  user: OrganisationRoleUser,
  organisation: Pick<Organisation, "id"> & { has_sro?: boolean }
): boolean {
  if (user.user_group === UserGroup.ADMINS) {
    return true;
  }

  const role = getOrganisationRole(user);

  if (role === null || user.organisation_id !== organisation.id) {
    return false;
  }

  switch (role) {
    case OrganisationRole.SRO:
      return true;
    case OrganisationRole.DELEGATE:
      return organisation.has_sro === false;
  }
}

export { canPerformSroRestrictedAction, getOrganisationRole };
