import ProjectsSubPageDisplay from "@/app/[locale]/(logged-in)/organisation/profile/components/ProjectsSubPageDisplay";
import { ProjectsSubTabs } from "../../../consts/tabs";
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
