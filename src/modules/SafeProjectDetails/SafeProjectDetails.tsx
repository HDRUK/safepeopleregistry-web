import ChipStatus from "@/components/ChipStatus";
import Text from "@/components/Text";
import { getSponsorshipStatus } from "@/utils/application";
import { Typography } from "@mui/material";
import FieldsToText from "../../components/FieldsToText";
import { ResearcherProject } from "../../types/application";
import { formatDisplayLongDate } from "../../utils/date";
import { createProjectDefaultValues } from "../../utils/form";

interface SafeProjectDetailsProps {
  projectData: ResearcherProject;
}

const NAMESPACE_TRANSLATION = "Projects";

export default function SafeProjectDetails({
  projectData,
}: SafeProjectDetailsProps) {
  const data = createProjectDefaultValues(projectData);

  const sponsor = projectData.project_has_sponsorships?.[0]?.sponsor;
  const sponsorshipStatus = getSponsorshipStatus(sponsor, projectData);

  return (
    <FieldsToText
      data={data}
      keys={[
        "request_category_type",
        {
          column_id: "period",
          content: (
            <Typography>
              {formatDisplayLongDate(data.start_date)} to{" "}
              {formatDisplayLongDate(data.end_date)}
            </Typography>
          ),
        },
        ...(sponsor
          ? [
              {
                column_id: "project_has_sponsorships",
                content: (
                  <Text endIcon={<ChipStatus status={sponsorshipStatus} />}>
                    {sponsor?.organisation_name}
                  </Text>
                ),
              },
            ]
          : []),
        {
          column_id: "custodians",
          content: (
            <Typography component="ul">
              {projectData.custodians?.map(({ name }) => <li>{name}</li>)}
            </Typography>
          ),
        },
        "lay_summary",
        "public_benefit",
        "technical_summary",
        "other_approval_committees",
      ]}
      tKey={NAMESPACE_TRANSLATION}
    />
  );
}
