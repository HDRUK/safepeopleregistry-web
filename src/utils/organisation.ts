import { OrganisationSroStatus, Status } from "@/consts/application";
import { UserGroup } from "@/consts/user";
import { EntityType } from "@/types/api";
import { Organisation, User } from "@/types/application";

function filterOrganisationsList(
  organisation: Organisation,
  entityType: EntityType,
  entityId: number
) {
  const invitingUser = organisation.sro_officer?.invited_by;

  if (entityType === EntityType.ORGANISATION) {
    return organisation.id === entityId;
  }

  if (entityType === EntityType.ADMIN) {
    return true;
  }

  if (!invitingUser) {
    return organisation.system_approved;
  }

  if (entityType === EntityType.CUSTODIAN) {
    return (
      invitingUser?.user_group === UserGroup.ADMINS ||
      entityId === invitingUser.custodian_user?.custodian_id
    );
  }

  if (entityType === EntityType.USER) {
    return (
      invitingUser?.user_group === UserGroup.ADMINS ||
      entityId === invitingUser.id
    );
  }

  return false;
}

// needs backend: an organisation status field instead of setting it here?
function getOrganisationAccountStatus(organisation: Organisation): Status {
  if (!organisation.unclaimed) {
    return Status.ORGANISATION_ACCOUNT_CREATED;
  }

  if (
    [
      Status.ORGANISATION_INVITED_BY_NONADMIN,
      Status.ORGANISATION_INVITED_BY_ADMIN,
    ].includes(organisation.model_state?.state?.slug as Status)
  ) {
    return organisation.model_state.state.slug as Status;
  }

  return Status.ORGANISATION_PLACEHOLDER;
}

// A Record, so adding an OrganisationSroStatus without a Status fails to compile.
const SRO_STATUSES: Record<OrganisationSroStatus, Status> = {
  [OrganisationSroStatus.CLAIMED]: Status.SRO_CLAIMED,
  [OrganisationSroStatus.INVITED]: Status.SRO_INVITED,
  [OrganisationSroStatus.NONE]: Status.SRO_NONE,
};

function getSroStatus({
  sro_status,
}: Pick<Organisation, "sro_status">): Status | undefined {
  return sro_status ? SRO_STATUSES[sro_status] : undefined;
}

// An organisation user detached from their organisation, e.g. a removed delegate.
function isWithoutOrganisation(
  user: Pick<User, "user_group" | "organisation_id">
): boolean {
  return (
    user.user_group === UserGroup.ORGANISATIONS && user.organisation_id == null
  );
}

export {
  filterOrganisationsList,
  getOrganisationAccountStatus,
  getSroStatus,
  isWithoutOrganisation,
};
