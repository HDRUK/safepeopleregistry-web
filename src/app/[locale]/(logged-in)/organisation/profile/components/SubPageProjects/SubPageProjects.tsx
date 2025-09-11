import { useStore } from "@/data/store";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { ResearcherProject } from "@/types/application";
import { useEffect } from "react";
import StatusList from "@/components/StatusList";
import Guidance from "@/components/Guidance";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  projectData: ResearcherProject;
  params: {
    subTabId: ProjectsSubTabs;
    id?: number;
  };
}

export default function SubPageProjects({ params, projectData }: PageProps) {
  const tabId = PageTabs.PROJECTS;

  const [project, setProject] = useStore(state => [
    state.getCurrentProject(),
    state.setCurrentProject,
  ]);

  useEffect(() => {
    setProject(projectData);
  }, [projectData]);

  const guidance = mockedSafeProjectGuidanceProps;

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
            <StatusList projectStatus={project?.model_state.state.slug} />
            <Guidance {...guidance} isCollapsible={false} infoWidth="100%" />
          </PageColumnDetails>
        </PageColumns>
      </PageBodyContainer>
    )
  );
}
