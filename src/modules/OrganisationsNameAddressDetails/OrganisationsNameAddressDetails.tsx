import { Organisation } from "../../types/application";
import { Box, Typography } from "@mui/material";
import FieldsToText from "../../components/FieldsToText";
import SubsidiariesTable from "../SubsidiariesTable";

interface OrganisationsNameAddressDetailsProps {
  organisationData: Organisation;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Organisations";

export default function OrganisationsNameAddressDetails({
  organisationData,
  tKey = NAMESPACE_TRANSLATION,
}: OrganisationsNameAddressDetailsProps) {
  return (
    <FieldsToText
      data={organisationData}
      keys={[
        "organisation_name",
        {
          column_id: "address",
          content: (
            <Typography>
              {[
                "address_1",
                "address_2",
                "town",
                "county",
                "country",
                "postcode",
              ].map(key => (
                <div>{organisationData[key]}</div>
              ))}
            </Typography>
          ),
        },
        {
          column_id: "subsidiaries",
          content: (
            <Box
              sx={{
                maxWidth: {
                  lg: "50%",
                },
              }}>
              <SubsidiariesTable
                subsidiariesData={organisationData.subsidiaries || []}
              />
            </Box>
          ),
        },
      ]}
      tKey={tKey}
    />
  );
}
