import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageSection } from "@/modules";
import PageGuidance from "@/modules/PageGuidance";
import ProjectsSafeDataForm from "@/organisms/ProjectsSafeDataForm";
import useMutateProjectDetails from "@/queries/useMutateProjectDetails";
import { PutProjectDetailsPayload } from "@/services/project_details";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { pick } from "@/utils/json";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ProjectImport from "@/modules/ProjectImport";

const NAMESPACE_TRANSLATION = "CustodianProfile";

const PAYLOAD_FIELDS = [
  "datasets",
  "data_sensitivity_level",
  "legal_basis_for_data_article6",
  "duty_of_confidentiality",
  "national_data_optout",
  "request_frequency",
  "dataset_linkage_description",
  "data_minimisation",
  "data_use_description",
  "access_date",
];

export default function ProjectsSafeData() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { custodian, project } = useStore(state => ({
    custodian: state.getCustodian(),
    project: state.getCurrentProject(),
  }));

  const queryClient = useQueryClient();

  const { mutateAsync, mutateState } = useMutateProjectDetails(project.id);

  const [defaultValues, setDefaultValues] = useState(
    pick(
      createProjectDetailDefaultValues(project.project_detail || {}),
      PAYLOAD_FIELDS
    )
  );

  const handleGatewayProjectImport = (data: ProjectDetails) => {
    setDefaultValues(pick(data, PAYLOAD_FIELDS));
  };

  const handleSubmit = async (payload: PutProjectDetailsPayload) => {
    await mutateAsync({
      ...project.project_detail,
      ...payload,
      datasets: payload?.datasets?.map(d => d.value),
    });
  };

  useQueryAlerts(mutateState, {
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["getProject", project.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["getProjects", project.id],
      });
    },
  });

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <PageBody
        heading={t("safeData")}
        actions={
          <ProjectImport
            custodianId={custodian.id}
            projectId={project.id}
            onImported={handleGatewayProjectImport}
            isImportDisabled={!project?.unique_id}
          />
        }>
        <PageSection>
          <ProjectsSafeDataForm
            projectId={project.id}
            defaultValues={defaultValues}
            mutateState={mutateState}
            onSubmit={handleSubmit}
          />
        </PageSection>
      </PageBody>
    </PageGuidance>
  );
}
