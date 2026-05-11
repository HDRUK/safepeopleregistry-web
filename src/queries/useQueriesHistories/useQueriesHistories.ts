import { getAccreditations } from "@/app/actions/accreditations";
import { getAffiliations } from "@/app/actions/affiliations";
import { getEducations } from "@/app/actions/educations";
import { getProfessionalRegistrations } from "@/app/actions/professional_registrations";
import { getUserValidatedProjects } from "@/app/actions/projects";
import { getTrainingByRegistryId } from "@/app/actions/trainings";
import useQueriesCombined from "@/hooks/useQueriesCombined";
import { getAccreditationsQuery } from "@/services/accreditations";
import { getAffiliationsQuery } from "@/services/affiliations";
import { getEducationsQuery } from "@/services/educations";
import { getProfessionalRegistrationsQuery } from "@/services/professional_registrations";
import { getUserValidatedProjectsQuery } from "@/services/projects";
import { getTrainingByRegistryIdQuery } from "@/services/trainings";
import { QueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";

export interface HistoryCombinedData {
  getEducations: Awaited<ReturnType<typeof getEducations>>;
  getTrainings: Awaited<ReturnType<typeof getTrainingByRegistryId>>;
  getUserValidatedProjects: Awaited<
    ReturnType<typeof getUserValidatedProjects>
  >;
  getAccreditations: Awaited<ReturnType<typeof getAccreditations>>;
  getAffiliations: Awaited<ReturnType<typeof getAffiliations>>;
  getProfessionalRegistrations: Awaited<
    ReturnType<typeof getProfessionalRegistrations>
  >;
}

export default function useQueriesHistory(
  registryId?: number,
  options: QueryOptions = {}
) {
  const queries = useMemo(
    () =>
      registryId
        ? [
            getAffiliationsQuery(registryId, options),
            getEducationsQuery(registryId, options),
            getTrainingByRegistryIdQuery(registryId, options),
            getAccreditationsQuery(registryId, options),
            getUserValidatedProjectsQuery(registryId, options),
            getProfessionalRegistrationsQuery(registryId, options),
          ]
        : [],
    []
  );

  return useQueriesCombined<HistoryCombinedData>(queries);
}
