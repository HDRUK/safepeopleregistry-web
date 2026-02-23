import { Box, Link, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Organisation } from "../../types/application";

export interface OrganisationDetailsSlimProps {
  organisation: Organisation;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function OrganisationDetailsSlim({
  organisation,
}: OrganisationDetailsSlimProps) {
  console.log(organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  if (!organisation) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="flex-start" sx={{ pb: 2, gap: 3 }}>
      <Box display="flex" flexDirection="column">
        <Typography variant="h2" sx={{ flexWrap: 1 }}>
          {organisation.organisation_name}
        </Typography>
        <Typography>
          {t("companyNumberAbbr")}: {organisation.companies_house_no}
        </Typography>
        <Typography>
          <Link href={`mailto: ${organisation.lead_applicant_email}`}>
            {organisation.lead_applicant_email}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
