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
import ProjectsSafeOutputsForm from "@/organisms/ProjectsSafeOutputsForm";
import useMutateProjectDetails from "@/queries/useMutateProjectDetails";
import { PutProjectDetailsPayload } from "@/services/projects";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { pick } from "@/utils/json";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";

const NAMESPACE_TRANSLATION = "CustodianProfile";

const PAYLOAD_FIELDS = ["data_assets", "research_outputs"];

export default function ProjectsSafeOutputs() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();
  const { project, custodian } = useStore(state => ({
    project: state.getCurrentProject(),
    custodian: state.getCustodian(),
  }));

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
    });
  };

  useQueryAlerts(mutateState, {
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["getProject", project.id],
      });
    },
  });

  return (
    <PageColumns>
      <PageColumnBody lg={8}>
        <SubTabsSections
          tabId={PageTabs.PROJECTS}
          subTabId={ProjectsSubTabs.SAFE_OUTPUTS}
          id={project.id}
        />
        <PageBody
          heading={t("safeOutputs")}
          actions={
            <ProjectImport
              custodianId={custodian.id}
              projectId={project.id}
              onImported={handleGatewayProjectImport}
              isImportDisabled={!project?.unique_id}
            />
          }>
          <PageSection>
            <ProjectsSafeOutputsForm
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
