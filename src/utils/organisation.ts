import { Status } from "@/consts/application";
import { UserGroup } from "@/consts/user";
import { EntityType } from "@/types/api";
import { Organisation } from "@/types/application";

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

  const invitedBy = organisation.sro_officer?.invited_by;

  if (invitedBy) {
    return invitedBy.user_group === UserGroup.ADMINS
      ? Status.ORGANISATION_INVITED_BY_ADMIN
      : Status.ORGANISATION_INVITED_BY_OTHER;
  }

  if (organisation.model_state?.state?.slug === Status.INVITED) {
    return Status.ORGANISATION_INVITED_BY_OTHER;
  }

  return Status.ORGANISATION_PLACEHOLDER;
}

// needs backend: SRO approval status (approved/pending/rejected)
const SRO_STATUSES = {
  approved: Status.SRO_APPROVED,
  pending: Status.SRO_PENDING,
  rejected: Status.SRO_REJECTED,
};

function getSroStatus({ sro_status }: Organisation): Status | undefined {
  return sro_status ? SRO_STATUSES[sro_status] : undefined;
}

export { filterOrganisationsList, getOrganisationAccountStatus, getSroStatus };
