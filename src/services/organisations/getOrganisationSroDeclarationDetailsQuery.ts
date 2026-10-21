import getOrganisationSroDeclarationDetails from "@/app/actions/organisations/getOrganisationSroDeclarationDetails";

export default function getOrganisationSroDeclarationDetailsQuery(
  organisationId: number | undefined
) {
  return {
    queryKey: ["getOrganisationSroDeclarationDetails", organisationId],
    queryFn: () => {
      // Only runs when enabled, so organisationId is defined.
      return getOrganisationSroDeclarationDetails(organisationId as number, {
        error: {
          message: "getOrganisationSroDeclarationDetailsError",
        },
      });
    },
    enabled: !!organisationId,
  };
}
