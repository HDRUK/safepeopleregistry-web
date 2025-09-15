import { Box } from "@mui/material";
import FieldsToText from "../../components/FieldsToText";
import { Organisation } from "../../types/application";

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
        "companies_house_no",
        "ror_id",
        {
          column_id: "charities",
          content: (
            <Box
              sx={{
                maxWidth: {
                  lg: "50%",
                },
              }}>
              {/* <CharitiesTable charitiesData={organisationData.charities} /> */}
            </Box>
          ),
        },
      ]}
      tKey={tKey}
    />
  );
}
