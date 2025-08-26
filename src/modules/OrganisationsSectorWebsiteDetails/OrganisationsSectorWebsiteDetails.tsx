import { Link as MuiLink } from "@mui/material";
import { Link } from "@/i18n/routing";
import FieldsToText from "../../components/FieldsToText";
import { Organisation } from "../../types/application";

export interface OrganisationsSectorWebsiteDetailsProps {
  organisationData: Organisation;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Organisations";

export default function OrganisationsSectorWebsiteDetails({
  organisationData,
  tKey = NAMESPACE_TRANSLATION,
}: OrganisationsSectorWebsiteDetailsProps) {
  return (
    <FieldsToText
      data={organisationData}
      keys={[
        {
          column_id: "sector.name",
          heading: "sectorName",
        },
        "organisation_size",
        {
          column_id: "website",
          content: organisationData.website && (
            <MuiLink
              component={Link}
              href={organisationData.website}
              target="_blank">
              {organisationData.website}
            </MuiLink>
          ),
        },
      ]}
      tKey={tKey}
    />
  );
}
