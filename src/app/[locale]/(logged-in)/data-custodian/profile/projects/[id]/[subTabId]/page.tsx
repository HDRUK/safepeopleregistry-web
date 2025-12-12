"use client";

import { DEFAULT_STALE_TIME } from "@/consts/requests";
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
  const { data: project, isFetched } = useSuspenseQuery(
    getProjectQuery(+id, { staleTime: DEFAULT_STALE_TIME })
  );

  if (!project?.data && isFetched) {
    notFound();
  }

  return (
    project?.data &&
    project.data.id === Number(id) && (
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
