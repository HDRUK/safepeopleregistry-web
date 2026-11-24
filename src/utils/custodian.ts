import { CustodianUserRoles } from "../consts/custodian";
import { CustodianUser, Permission } from "../types/application";
import { getPermission } from "./permissions";

function isCustodianAdministrator(
  user: CustodianUser,
  permissions: Permission[]
) {
  const permission = getPermission(
    CustodianUserRoles.ADMINISTRATOR,
    permissions
  );

  return user?.user_permissions?.[0]?.permission_id === permission?.id;
}

function isCustodianApprover(user: CustodianUser, permissions: Permission[]) {
  const permission = getPermission(CustodianUserRoles.APPROVER, permissions);

  return user?.user_permissions?.[0]?.permission_id === permission?.id;
}

function isCustodianViewer(user: CustodianUser, permissions: Permission[]) {
  const permission = getPermission(CustodianUserRoles.VIEWER, permissions);

  if (!permission) return false;

  return user?.user_permissions?.[0]?.permission_id === permission.id;
}

function isCustodianUserViewOnly(user: CustodianUser) {
  const permissions =
    user?.user_permissions?.map(({ permission }) => permission) ?? [];

  return isCustodianViewer(user, permissions);
}

function getCustodianUserRole(
  user: CustodianUser | undefined
): CustodianUserRoles | null {
  const name = user?.user_permissions?.[0]?.permission?.name;

  return Object.values(CustodianUserRoles).find(role => role === name) ?? null;
}

export {
  getCustodianUserRole,
  isCustodianAdministrator,
  isCustodianApprover,
  isCustodianViewer,
  isCustodianUserViewOnly,
};
