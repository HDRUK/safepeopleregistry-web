import { ProjectsSubTabs } from "../../../consts/tabs";
import Page from "./components/Page";

interface SubPageProjectsProps {
  params: Promise<{
    subTabId: ProjectsSubTabs;
    id: number;
  }>;
}

async function ProjectsSubPage({ params }: SubPageProjectsProps) {
  const { subTabId, id } = await params;

  return (
    <Page
      params={{
        subTabId,
        id,
      }}
    />
  );
}

export default ProjectsSubPage;
