import { Box, Link, Typography } from "@mui/material";
import { Organisation } from "../../types/application";

export interface OrganisationDetailsSlimProps {
  organisation: Organisation;
}

export default function OrganisationDetailsSlim({
  organisation,
}: OrganisationDetailsSlimProps) {
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
