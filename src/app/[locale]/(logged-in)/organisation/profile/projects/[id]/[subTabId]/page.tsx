import { ProjectsSubTabs } from "../../../consts/tabs";
import ProjectsSubPageDisplay from "@/components/ProjectsSubPageDisplay";

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
