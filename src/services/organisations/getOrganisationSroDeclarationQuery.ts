import getOrganisationSroDeclaration from "@/app/actions/organisations/getOrganisationSroDeclaration";

export default function getOrganisationSroDeclarationQuery(
  id: number | undefined
) {
  return {
    queryKey: ["getOrganisationSroDeclaration", id],
    queryFn: () => {
      return getOrganisationSroDeclaration(id as number);
    },
    enabled: !!id,
  };
}
