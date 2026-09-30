import getOrganisationSroDeclaration from "@/app/actions/organisations/getOrganisationSroDeclaration";
import downloadFile from "@/app/actions/files/downloadFile";


export default function getOrganisationSroDeclarationQuery(id: number | undefined) {
  return {
    queryKey: ["getOrganisationSroDeclaration"],
    queryFn: () => {
      return getOrganisationSroDeclaration(id as number);
    },
    enabled: !!id,
  };
}
