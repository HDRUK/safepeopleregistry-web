import getOrganisationDelegates from "@/app/actions/organisations/getOrganisationDelegates";

export default function getOrganisationDelegatesQuery(
  organisationId: number,
  enabled: boolean
) {
  return {
    queryKey: ["getOrganisationDelegates", organisationId],
    queryFn: ({ queryKey }) => {
      return getOrganisationDelegates(queryKey[1] as number, {
        error: {
          message: "getOrganisationDelegatesError",
        },
      });
    },
    enabled,
  };
}
