"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { getProjectForUserQuery } from "@/services/projects";
import { useStore } from "@/data/store";
import SubPageProjects from "../../../components/SubPageProjects";
import { ProjectsSubTabs } from "../../../consts/tabs";

interface SubPageProjectsProps {
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}

function ProjectsSubPage({ params: { subTabId, id } }: SubPageProjectsProps) {
  const user = useStore(state => state.getUser());

  const { data: project, isFetched } = useSuspenseQuery(
    getProjectForUserQuery(id, user.id)
  );

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
