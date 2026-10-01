import { useQuery } from "@tanstack/react-query";
import getOrganisationSroDeclarationQuery from "../../services/organisations/getOrganisationSroDeclarationQuery";

export default function useSroDeclarationDownload(organisationId: number) {
  const { refetch: sroDeclarationDownload, ...queryState } = useQuery({
    ...getOrganisationSroDeclarationQuery(organisationId),
    queryKey: [`sroDeclarationDownload`, organisationId],
    enabled: false,
  });

  return {
    // Modify the return to match
    sroDeclarationDownload,
    ...queryState,
  };
}
