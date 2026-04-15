import { useMemo } from "react";
import { QueryOptions } from "../../types/requests";
import useQueriesCombined from "../../hooks/useQueriesCombined";
import {
  getAccreditations,
  getAccreditationsQuery,
} from "../../services/accreditations";
import getAffiliations from "../../app/actions/affiliations/getAffiliations";
import getAffiliationsQuery from "../../services/affiliations/getAffiliationsQuery";
import { getEducations, getEducationsQuery } from "../../services/educations";
import {
  getProfessionalRegistrations,
  getProfessionalRegistrationsQuery,
} from "../../services/professional_registrations";
import {
  getUserValidatedProjects,
  getUserValidatedProjectsQuery,
} from "../../services/projects";
import {
  getTrainingByRegistryId,
  getTrainingByRegistryIdQuery,
} from "../../services/trainings";

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
