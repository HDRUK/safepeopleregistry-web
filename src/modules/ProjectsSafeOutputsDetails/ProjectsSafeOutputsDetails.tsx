import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import FieldsToText from "../../components/FieldsToText";
import { Message } from "../../components/Message";
import { ProjectDetails } from "../../types/application";
import { createProjectDetailDefaultValues } from "../../utils/form";

interface ProjectsSafeOuputsDetailsProps {
  projectDetailsData: ProjectDetails;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Projects.SafeOutputs";

export default function ProjectsSafeOutputsDetails({
  projectDetailsData,
  tKey = NAMESPACE_TRANSLATION,
}: ProjectsSafeOuputsDetailsProps) {
  const t = useTranslations(tKey);

  if (!projectDetailsData)
    return <Message severity="warning">{t("noProjectDetails")}</Message>;

  const data = createProjectDetailDefaultValues(projectDetailsData, {
    transformToReadable: true,
  });

  return (
    <FieldsToText
      data={data}
      keys={[
        "data_assets",
        {
          column_id: "research_outputs",
          content: (
            <Typography component="ul">
              {data?.research_outputs?.research_outputs?.map((url: string) => (
                <li key={url}>
                  <a href={url}>{url}</a>
                </li>
              ))}
            </Typography>
          ),
        },
      ]}
      tKey={tKey}
    />
  );
}
