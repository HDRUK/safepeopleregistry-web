import type { Metadata } from "next";
import ProjectsSubPageDisplay from "@/app/[locale]/(logged-in)/data-custodian/profile/components/ProjectsSubPageDisplay";
import { SITE_NAME } from "@/utils/metadata";
import { ProjectsSubTabs } from "../../../consts/tabs";

export const metadata: Metadata = {
  title: `Project Details | ${SITE_NAME}`,
  description: "View the details and status of a specific research project.",
};

interface SubPageProjectsProps {
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}

async function ProjectsSubPage({ params }: SubPageProjectsProps) {
  const { subTabId, id } = await params;

  return (
    <ProjectsSubPageDisplay
      params={{
        subTabId: subTabId,
        id,
      }}
    />
  );
}

export default ProjectsSubPage;
