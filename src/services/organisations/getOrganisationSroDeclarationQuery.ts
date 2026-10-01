import getOrganisationSroDeclaration from "@/app/actions/organisations/getOrganisationSroDeclaration";


export default function getOrganisationSroDeclarationQuery(id: number | undefined) {
  return {
    queryKey: ["getOrganisationSroDeclaration"],
    queryFn: () => {
      return getOrganisationSroDeclaration(id as number);
    },
    enabled: !!id,
  };
}
