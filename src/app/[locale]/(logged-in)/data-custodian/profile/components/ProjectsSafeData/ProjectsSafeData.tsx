import Guidance from "@/components/Guidance";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedCustodianSafeProjectGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import ProjectImport from "@/modules/ProjectImport";
import ProjectsSafeDataForm from "@/organisms/ProjectsSafeDataForm";
import useMutateProjectDetails from "@/queries/useMutateProjectDetails";
import { PutProjectDetailsPayload } from "@/services/project_details";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { pick } from "@/utils/json";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { formatDBDateTime } from "@/utils/date";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";

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
      access_date: formatDBDateTime(payload.access_date),
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
    <PageColumns>
      <PageColumnBody lg={8}>
        <SubTabsSections
          tabId={PageTabs.PROJECTS}
          subTabId={ProjectsSubTabs.SAFE_DATA}
          id={project.id}
        />
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
      </PageColumnBody>
      <PageColumnDetails lg={4}>
        <Guidance
          {...mockedCustodianSafeProjectGuidanceProps}
          isCollapsible={false}
          infoWidth="100%"
        />
      </PageColumnDetails>
    </PageColumns>
  );
}
