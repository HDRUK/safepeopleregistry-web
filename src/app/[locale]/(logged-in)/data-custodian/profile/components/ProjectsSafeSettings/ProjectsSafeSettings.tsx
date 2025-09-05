import Guidance from "@/components/Guidance";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import ProjectImport from "@/modules/ProjectImport";
import ProjectsSafeSettingsForm from "@/organisms/ProjectsSafeSettingsForm";
import useMutateProjectDetails from "@/queries/useMutateProjectDetails";
import { PutProjectDetailsPayload } from "@/services/project_details";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { pick } from "@/utils/json";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";

const NAMESPACE_TRANSLATION = "CustodianProfile";

const PAYLOAD_FIELDS = ["access_type", "data_privacy"];

export default function ProjectsSafeProject() {
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
          subTabId={ProjectsSubTabs.SAFE_SETTINGS}
          id={project.id}
        />
        <PageBody
          heading={t("safeSettings")}
          actions={
            <ProjectImport
              custodianId={custodian.id}
              projectId={project.id}
              onImported={handleGatewayProjectImport}
              isImportDisabled={!project?.unique_id}
            />
          }>
          <PageSection>
            <ProjectsSafeSettingsForm
              defaultValues={defaultValues}
              mutateState={mutateState}
              projectId={project.id}
              onSubmit={handleSubmit}
            />
          </PageSection>
        </PageBody>
      </PageColumnBody>
      <PageColumnDetails lg={4}>
        <Guidance
          {...mockedSafeProjectGuidanceProps}
          isCollapsible={false}
          infoWidth="100%"
        />
      </PageColumnDetails>
    </PageColumns>
  );
}
