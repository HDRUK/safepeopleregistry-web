import { getAffiliationsWorkflowTransitions } from "@/app/actions/affiliations";
import { getCustodian } from "@/app/actions/custodians";
import { getOrganisation } from "@/app/actions/organisations";
import { getPermissions } from "@/app/actions/permissions";
import { getProjectRoles } from "@/app/actions/project_roles";
import { getSectors } from "@/app/actions/sectors";
import { getSystemConfig } from "@/app/actions/system_config";
import { getUser } from "@/app/actions/users";
import useQueriesCombined from "@/hooks/useQueriesCombined";
import { getAffiliationsWorkflowTransitionsQuery } from "@/services/affiliations";
import { getCustodianQuery } from "@/services/custodians";
import { getOrganisationQuery } from "@/services/organisations";
import { getPermissionsQuery } from "@/services/permissions";
import { getProjectRolesQuery } from "@/services/project_roles";
import { getSectorsQuery } from "@/services/sectors";
import { getSystemConfigQuery } from "@/services/system_config";
import { getUserQuery } from "@/services/users";
import { User } from "@/types/application";
import { QueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";

interface UseApplicationDependenciesProps {
  user?: User;
  custodianId?: number;
  organisationId?: number;
}

interface ApplicationDependenciesCombinedData {
  getSystemConfig: Awaited<ReturnType<typeof getSystemConfig>>;
  getUser: Awaited<ReturnType<typeof getUser>>;
  getOrganisation: Awaited<ReturnType<typeof getOrganisation>>;
  getSectors: Awaited<ReturnType<typeof getSectors>>;
  getPermissions: Awaited<ReturnType<typeof getPermissions>>;
  getCustodian: Awaited<ReturnType<typeof getCustodian>>;
  getProjectRoles: Awaited<ReturnType<typeof getProjectRoles>>;
  getAffiliationsWorkflowTransitions: Awaited<
    ReturnType<typeof getAffiliationsWorkflowTransitions>
  >;
}

export default function useApplicationDependencies(
  { user, custodianId, organisationId }: UseApplicationDependenciesProps,
  options: QueryOptions = {}
) {
  const queries = useMemo(
    () =>
      user
        ? [
            getSystemConfigQuery(),
            getUserQuery(user.id, options),
            ...(organisationId
              ? [getOrganisationQuery(organisationId, options)]
              : []),
            ...(custodianId ? [getCustodianQuery(custodianId, options)] : []),
            getSectorsQuery(options),
            getPermissionsQuery(options),
            getProjectRolesQuery(options),
            getAffiliationsWorkflowTransitionsQuery(options),
          ]
        : [],
    []
  );

  return useQueriesCombined<ApplicationDependenciesCombinedData>(queries);
}
