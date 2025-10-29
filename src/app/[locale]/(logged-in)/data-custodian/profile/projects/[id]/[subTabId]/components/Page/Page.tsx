"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { DEFAULT_STALE_TIME } from "@/consts/requests";
import getProjectQuery from "@/services/projects/getProjectQuery";
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

  const {
    data: project,
    isPending,
    isFetched,
  } = useQuery(getProjectQuery(+id, { staleTime: DEFAULT_STALE_TIME }));

  if (!project?.data && isFetched) {
    notFound();
  }

  return (
    <LoadingWrapper variant="basic" loading={isPending}>
      {project?.data && project.data.id === Number(id) && (
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
