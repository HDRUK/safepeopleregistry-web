import { isFileScanComplete } from "@/utils/file";
import { Chip, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslations } from "next-intl";
import { Organisation, PendingSro } from "../../types/application";
import { getOrganisationSroDeclarationDetailsQuery } from "@/services/organisations/";
import { useQuery } from "@tanstack/react-query";
import SroDeclarationDownloadLink from "@/components/SroDeclarationDownloadLink/SroDeclarationDownloadLink";

export type OrganisationsSroDetailsProps = {
  organisation: Organisation;
  pendingSro?: PendingSro | null;
};

const NAMESPACE_TRANSLATION_APPLICATION = "Form";
const NAMESPACE_TRANSLATION_SRO_DETAILS = "Organisations.SroDetails";

export default function OrganisationsSroDetails({
  organisation,
  pendingSro,
}: OrganisationsSroDetailsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const tSro = useTranslations(NAMESPACE_TRANSLATION_SRO_DETAILS);

  const sroDetails = organisation.sro_officer;
  // Ask for the latest declaration's details rather than downloading it. The
  // download goes through the organisation endpoint, which checks access.
  const { data: sroDeclarationDetails, isSuccess: isSroDeclarationFetched } =
    useQuery(getOrganisationSroDeclarationDetailsQuery(organisation.id));
  const canDownloadSroDeclaration = isFileScanComplete(
    sroDeclarationDetails?.data
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        mt: 2,
        alignItems: "flex-start",
      }}>
      <Typography variant="h2">{tSro("sroOfficerContact")}</Typography>
      <Typography>{tSro("sroOfficierContactInfo")}</Typography>

      <div>
        <Typography variant="h6">{t("name")}</Typography>
        <Typography>
          {sroDetails?.first_name} {sroDetails?.last_name}
        </Typography>
      </div>

      {sroDetails?.departments?.[0] && (
        <div>
          <Typography variant="h6">{t("department")}</Typography>
          <Typography>{sroDetails.departments[0].name}</Typography>
        </div>
      )}
      {sroDetails?.email && (
        <div>
          <Typography variant="h6">{t("email")}</Typography>
          <Link href={`mailto:${sroDetails.email}`}>{sroDetails.email}</Link>
        </div>
      )}
      {sroDetails?.role && (
        <div>
          <Typography variant="h6">{t("jobTitle")}</Typography>
          <Typography>{sroDetails.role}</Typography>
        </div>
      )}
      {isSroDeclarationFetched && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}>
          <Typography variant="h6">{tSro("sroDeclarationForm")}</Typography>
          {canDownloadSroDeclaration ? (
            <SroDeclarationDownloadLink organisationId={organisation.id} />
          ) : (
            <Chip color="warning" label={tSro("sroDeclarationMissing")} />
          )}
          {pendingSro && (
            <Chip color="warning" label={tSro("sroChangeInProgress")} />
          )}
        </Box>
      )}
      {organisation?.sro_profile_uri && (
        <div>
          <Typography variant="h6">{tSro("profileLink")}</Typography>
          <Link href={organisation.sro_profile_uri} target="_blank">
            {organisation.sro_profile_uri}
          </Link>
        </div>
      )}
    </Box>
  );
}
