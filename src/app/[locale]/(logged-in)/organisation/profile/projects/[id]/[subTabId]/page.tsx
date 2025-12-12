"use client";

import getProjectQuery from "@/services/projects/getProjectQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import SubPageProjects from "../../../components/SubPageProjects";
import { ProjectsSubTabs } from "../../../consts/tabs";

interface SubPageProjectsProps {
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}

function ProjectsSubPage({ params: { subTabId, id } }: SubPageProjectsProps) {
  const { data: project, isFetched } = useSuspenseQuery(getProjectQuery(+id));

  if (!project?.data && isFetched) {
    notFound();
  }

  return (
    project?.data && (
      <SubPageProjects
        projectData={project.data}
        params={{
          subTabId,
          id,
        }}
      />
    )
  );
}

export default ProjectsSubPage;
