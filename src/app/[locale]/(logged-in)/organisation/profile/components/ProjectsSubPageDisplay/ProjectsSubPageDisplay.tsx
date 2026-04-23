"use client";

import SubPageProjects from "../SubPageProjects";
import { ProjectsSubTabs } from "@/app/[locale]/(logged-in)/user/profile/consts/tabs";
import LoadingWrapper from "@/components/LoadingWrapper";
import getProjectQuery from "@/services/projects/getProjectQuery";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
interface SubPageProjectsProps {
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}

export default function ProjectsSubPageDisplay({
  params: { subTabId, id },
}: SubPageProjectsProps) {
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
