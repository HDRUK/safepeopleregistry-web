import { useStore } from "@/data/store";
import { PageBodyContainer } from "@/modules";
import { ResearcherProject } from "@/types/application";
import { useEffect } from "react";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  projectData: ResearcherProject;
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}

export default function SubPageProjects({ params, projectData }: PageProps) {
  const tabId = PageTabs.PROJECTS;

  const [project, setProject] = useStore(state => [
    state.getCurrentProject(),
    state.setCurrentProject,
  ]);

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [projectData]);

  return (
    project?.id === Number(params?.id) && (
      <PageBodyContainer heading={project.title}>
        <SubTabsSections tabId={tabId} {...params} />
        <SubTabsContents tabId={tabId} {...params} />
      </PageBodyContainer>
    )
  );
}
