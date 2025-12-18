import { useFeatures } from "@/components/FeatureProvider";
import Guidance from "@/components/Guidance";
import StatusList from "@/components/StatusList";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import ActionValidationSponsorhsip from "@/modules/ActionValidationSponsorship";
import patchSponsorshipStatusQuery from "@/services/organisations/patchSponorshipStatusQuery";
import { ResearcherProject } from "@/types/application";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsContents from "../SubsTabContents";
import SubTabsSections from "../SubTabSections";

interface PageProps {
  projectData: ResearcherProject;
  params: {
    subTabId: ProjectsSubTabs;
    id?: number;
  };
}

export default function SubPageProjects({ params, projectData }: PageProps) {
  const tabId = PageTabs.PROJECTS;

  const { isSponsorship } = useFeatures();
  const queryClient = useQueryClient();
  const { organisation, project, setProject } = useStore(state => ({
    organisation: state.getOrganisation(),
    project: state.getCurrentProject(),
    setProject: state.setCurrentProject,
  }));

  const { mutate, ...queryState } = useMutation(patchSponsorshipStatusQuery());

  useQueryAlerts(queryState, {
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["getProject", project.id],
      });
    },
  });

  useEffect(() => {
    setProject(projectData);
  }, [projectData]);

  const guidance = mockedSafeProjectGuidanceProps;

  const handleUpdateStatus = (status: "approved" | "rejected") => {
    mutate({
      params: {
        organisationId: organisation.id,
      },
      payload: {
        status,
        project_id: project.id,
      },
    });
  };

  return (
    project && (
      <PageBodyContainer
        heading={`${projectData.title} (${projectData.unique_id})`}>
        <PageColumns>
          <PageColumnBody lg={8}>
            <SubTabsSections id={project.id} tabId={tabId} {...params} />
            <SubTabsContents tabId={tabId} {...params} />
          </PageColumnBody>
          <PageColumnDetails lg={4}>
            <StatusList
              projectStatus={project?.model_state.state.slug}
              sponsorshipStatus={
                project?.project_has_sponsorships?.[0]
                  ?.custodian_has_project_has_sponsorship?.[0]?.model_state
                  ?.state.slug
              }
            />
            {isSponsorship && (
              <ActionValidationSponsorhsip
                onStatusChange={handleUpdateStatus}
              />
            )}
            <Guidance {...guidance} isCollapsible={false} infoWidth="100%" />
          </PageColumnDetails>
        </PageColumns>
      </PageBodyContainer>
    )
  );
}
