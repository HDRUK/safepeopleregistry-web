import LoadingWrapper from "@/components/LoadingWrapper";
import { getProject } from "@/services/projects";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SubPageProjects from "../../../components/SubPageProjects";
import { ProjectsSubTabs } from "../../../consts/tabs";

interface SubPageProjectsProps {
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}

export default async function ProjectsSubPage({
  params: { subTabId, id },
}: SubPageProjectsProps) {
  const response = getProject(+id);

  return (
    <Suspense fallback={<LoadingWrapper variant="basic" loading />}>
      <SubPageProjects
        data={response}
        params={{
          subTabId,
          id,
        }}
      />
    </Suspense>
  );
}
