import { useStore } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { DEFAULT_STALE_TIME } from "@/consts/requests";
import { getOrganisationQuery } from "../../services/organisations";

export default function useOrganisationStore() {
  const [organisation, setOrganisation] = useStore(state => [
    state.getOrganisation(),
    state.setOrganisation,
  ]);
  const { data: organisationData, ...restQueryState } = useQuery(
    getOrganisationQuery(organisation?.id as number, {
      staleTime: DEFAULT_STALE_TIME,
    })
  );

  useEffect(() => {
    if (organisationData?.data) setOrganisation(organisationData.data);
  }, [organisationData?.data]);

  return {
    organisation,
    ...restQueryState,
  };
}
