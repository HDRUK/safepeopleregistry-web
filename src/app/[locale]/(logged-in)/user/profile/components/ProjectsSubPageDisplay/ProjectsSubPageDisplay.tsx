"use client";

import SubPageProjects from "../SubPageProjects";
import { ProjectsSubTabs } from "@/app/[locale]/(logged-in)/user/profile/consts/tabs";
import LoadingWrapper from "@/components/LoadingWrapper";
import { useStore } from "@/data/store";
import { getProjectForUserQuery } from "@/services/projects";
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
