import { Typography } from "@mui/material";
import FieldsToText from "../../components/FieldsToText";
import { Organisation } from "../../types/application";

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
                <div key={organisationData[key]}>{organisationData[key]}</div>
              ))}
            </Typography>
          ),
        },
      ]}
      tKey={tKey}
    />
  );
}
