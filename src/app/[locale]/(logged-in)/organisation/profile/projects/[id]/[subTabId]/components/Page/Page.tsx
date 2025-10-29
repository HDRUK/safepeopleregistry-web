"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import getProjectQuery from "@/services/projects/getProjectQuery";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import SubPageProjects from "../../../../../components/SubPageProjects";
import { ProjectsSubTabs } from "../../../../../consts/tabs";

interface ProjectsSubPageProps {
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}

function ProjectsSubPage({ params: { subTabId, id } }: ProjectsSubPageProps) {
  const {
    data: project,
    isPending,
    isFetched,
  } = useQuery(getProjectQuery(+id));

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
