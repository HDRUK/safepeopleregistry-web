import { getOrganisationStats } from "@/app/actions/organisations";
import { ResponseJson } from "../../types/requests";
import useQueriesCombined from "../../hooks/useQueriesCombined";

export default function useOrganisationStats(organisationId: number) {
  const queries = [
    {
      queryKey: ["getUsersStat", organisationId, "users"],
      queryFn: () => getOrganisationStats("users", organisationId),
    },
    {
      queryKey: ["getActiveProjectsStat", organisationId, "projects/present"],
      queryFn: () => getOrganisationStats("projects/past", organisationId),
    },
    {
      queryKey: ["getPastProjectsStat", organisationId, "projects/past"],
      queryFn: () => getOrganisationStats("projects/past", organisationId),
    },
    {
      queryKey: ["getCertificationsStat", organisationId, "certifications"],
      queryFn: () => getOrganisationStats("certifications", organisationId),
    },
  ];

  return useQueriesCombined<{
    getUsersStat: ResponseJson<string>;
    getActiveProjectsStat: ResponseJson<string>;
    getPastProjectsStat: ResponseJson<string>;
    getCertificationsStat: ResponseJson<string>;
  }>(queries);
}
