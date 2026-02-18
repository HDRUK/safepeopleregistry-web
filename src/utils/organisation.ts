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

export { filterOrganisationsList };
