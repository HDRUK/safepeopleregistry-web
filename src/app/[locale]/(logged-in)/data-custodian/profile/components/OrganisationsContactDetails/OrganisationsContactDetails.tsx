import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import OrganisationsSubsidiariesTable from "@/modules/OrganisationsSubsidiariesTable";
import OrganisationsNameAddressDetails from "@/modules/OrganisationsNameAddressDetails";
import { useTranslations } from "next-intl";
import { Box } from "@mui/system";
import OrganisationsSroDetails from "@/modules/OrganisationsSroDetails";

const NAMESPACE_TRANSLATION = "Organisations";
const NAMESPACE_TRANSLATION_SUBSIDIARIES = "Organisations.Subsidiaries";

export default function OrganisationsContactDetails() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tSubsidiaries = useTranslations(NAMESPACE_TRANSLATION_SUBSIDIARIES);

  const { organisation, projectOrganisation } = useStore(state => ({
    organisation: state.getCurrentOrganisation(),
    projectOrganisation: state.getCurrentProjectOrganisation(),
  }));

  console.log(projectOrganisation);

  return (
    <PageBody heading={t("organisationsContactDetails")}>
      <PageSection>
        <OrganisationsNameAddressDetails organisationData={organisation} />
      </PageSection>
      <PageSection>
        <Box
          sx={{
            maxWidth: {
              lg: "50%",
            },
          }}>
          <OrganisationsSubsidiariesTable
            includeColumns={["organisationName", "address"]}
            data={organisation.subsidiaries || []}
            t={tSubsidiaries}
            isPaginated={false}
          />
        </Box>
      </PageSection>
      <PageSection>
        <Box
          sx={{
            maxWidth: {
              lg: "80%",

              gap: 2,
            },
          }}>
          <OrganisationsSroDetails
            organisation={projectOrganisation.organisation}
          />
        </Box>
      </PageSection>
    </PageBody>
  );
}
