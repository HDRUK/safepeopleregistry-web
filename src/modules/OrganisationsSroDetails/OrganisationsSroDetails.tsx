import FileDownloadLink from "@/components/FileDownloadLink";
import { getLatestSRODeclaration } from "@/utils/file";
import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslations } from "next-intl";
import { Organisation } from "../../types/application";

export type OrganisationsSroDetailsProps = {
  organisation: Organisation;
};

const NAMESPACE_TRANSLATION_APPLICATION = "Form";
const NAMESPACE_TRANSLATION_SRO_DETAILS = "Organisations.SroDetails";

export default function OrganisationsSroDetails({
  organisation,
}: OrganisationsSroDetailsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const tSro = useTranslations(NAMESPACE_TRANSLATION_SRO_DETAILS);

  const sroDetails = organisation.sro_officer;

  const latestSroFile = getLatestSRODeclaration(organisation?.files);

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
      {latestSroFile && (
        <div>
          <Typography variant="h6">{tSro("signedDeclaration")}</Typography>
          <FileDownloadLink file={latestSroFile} />
        </div>
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
