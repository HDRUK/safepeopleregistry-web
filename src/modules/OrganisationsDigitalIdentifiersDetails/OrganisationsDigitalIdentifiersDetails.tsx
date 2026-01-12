import { Box, Link } from "@mui/material";
import FieldsToText from "../../components/FieldsToText";
import { Organisation } from "../../types/application";
import CharitiesTable from "../CharitiesTable";

export interface OrganisationsDigitalIdentifiersDetailsProps {
  organisationData: Organisation;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Organisations";

export default function OrganisationsDigitalIdentifiersDetails({
  organisationData,
  tKey = NAMESPACE_TRANSLATION,
}: OrganisationsDigitalIdentifiersDetailsProps) {
  return (
    <FieldsToText
      data={organisationData}
      keys={[
        {
          column_id: "organisation_unique_id",
        },
        {
          column_id: "companies_house_no",
          content: (
            <Link
              target="_blank"
              href={`https://find-and-update.company-information.service.gov.uk/company/${organisationData.companies_house_no}`}>
              {organisationData.companies_house_no}
            </Link>
          ),
        },
        {
          column_id: "ror_id",
          content: (
            <Link
              target="_blank"
              href={`https://ror.org/${organisationData.ror_id}`}>
              {organisationData.ror_id}
            </Link>
          ),
        },
        "",
        {
          column_id: "charities",
          content: (
            <Box>
              <CharitiesTable charitiesData={organisationData?.charities} />
            </Box>
          ),
        },
      ]}
      tKey={tKey}
    />
  );
}
