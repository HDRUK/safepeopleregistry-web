"use client";

import { useStore } from "@/data/store";
import { PageBodyContainer } from "@/modules";
import { ResearcherProject } from "@/types/application";
import { use, useEffect } from "react";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  data: ResearcherProject;
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}

export default function SubPageProjects({ params, data }: PageProps) {
  const { data: projectData } = use(data);
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
        <SubTabsContents tabId={tabId} {...params} />
      </PageBodyContainer>
    )
  );
}
