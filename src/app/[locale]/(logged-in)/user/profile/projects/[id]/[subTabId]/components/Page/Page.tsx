"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { useStore } from "@/data/store";
import { getProjectForUserQuery } from "@/services/projects";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import SubPageProjects from "../../../../../components/SubPageProjects";
import { ProjectsSubTabs } from "../../../../../consts/tabs";

interface SubPageProjectsProps {
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}

function ProjectsSubPage({ params }: SubPageProjectsProps) {
  const { subTabId, id } = params;

  const user = useStore(state => state.getUser());

  const {
    data: project,
    isPending,
    isFetched,
  } = useQuery(getProjectForUserQuery(id, user.id));

  if (!project?.data && isFetched) {
    notFound();
  }

  return (
    <LoadingWrapper variant="basic" loading={isPending}>
      {project?.data && (
        <SubPageProjects
          projectData={project.data}
          params={{
            subTabId,
            id,
          }}
        />
      )}
    </LoadingWrapper>
  );
}

export default ProjectsSubPage;
