import { CustodianUserRoles } from "@/consts/custodian";
import { OrganisationRole, UserGroup } from "@/consts/user";
import { AccountType } from "@/types/accounts";
import { User } from "@/types/application";
import { getOrganisationRole } from "./organisationRole";

const CUSTODIAN_ACCOUNT_TYPES: Record<CustodianUserRoles, AccountType> = {
  [CustodianUserRoles.ADMINISTRATOR]: AccountType.CUSTODIAN_ADMIN,
  [CustodianUserRoles.APPROVER]: AccountType.CUSTODIAN_APPROVER,
  [CustodianUserRoles.VIEWER]: AccountType.CUSTODIAN_VIEW_ONLY,
};

interface GetAccountTypeOptions {
  user?: Pick<User, "user_group" | "organisation_id" | "is_sro">;
  custodianRole?: CustodianUserRoles | null;
}

function getAccountType({
  user,
  custodianRole,
}: GetAccountTypeOptions): AccountType {
  switch (user?.user_group) {
    case UserGroup.ADMINS:
      return AccountType.ADMIN;
    case UserGroup.ORGANISATIONS:
      switch (getOrganisationRole(user)) {
        case OrganisationRole.SRO:
          return AccountType.ORGANISATION_SRO;
        case OrganisationRole.DELEGATE:
          return AccountType.ORGANISATION_DELEGATE;
        default:
          return AccountType.ORGANISATION;
      }
    case UserGroup.CUSTODIANS:
      return custodianRole
        ? CUSTODIAN_ACCOUNT_TYPES[custodianRole]
        : AccountType.CUSTODIAN;
    default:
      return AccountType.USER;
  }
}

export { getAccountType };
