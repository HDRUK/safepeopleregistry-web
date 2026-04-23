"use client";

import SubPageProjects from "@/app/[locale]/(logged-in)/data-custodian/profile/components/SubPageProjects";
import { ProjectsSubTabs } from "@/app/[locale]/(logged-in)/user/profile/consts/tabs";
import LoadingWrapper from "@/components/LoadingWrapper";
import { DEFAULT_STALE_TIME } from "@/consts/requests";
import { getProjectForUserQuery } from "@/services/projects";
import getProjectQuery from "@/services/projects/getProjectQuery";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useStore } from "@/data/store";

interface SubPageProjectsProps {
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
  isUser?: boolean;
}

export default function ProjectsSubPageDisplay({
  params: { subTabId, id },
  isUser = false,
}: SubPageProjectsProps) {
  const user = useStore(state => state.getUser());

  const {
    data: project,
    isPending,
    isFetched,
  } = useQuery(
    isUser
      ? getProjectForUserQuery(id, user.id)
      : getProjectQuery(+id, { staleTime: DEFAULT_STALE_TIME })
  );

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
