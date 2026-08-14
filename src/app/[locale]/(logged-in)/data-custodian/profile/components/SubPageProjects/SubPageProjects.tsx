import { useStore } from "@/data/store";
import { PageBodyContainer } from "@/modules";
import { ResearcherProject } from "@/types/application";
import { useEffect } from "react";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsContents from "../SubsTabContents";
import { Box, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslations } from "next-intl";

interface PageProps {
  projectData: ResearcherProject;
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}
const NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT = "CustodianProfile.Project";

export default function SubPageProjects({ params, projectData }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT);
  const { subTabId, id } = params;
  const tabId = PageTabs.PROJECTS;

  const [project, setProject] = useStore(state => [
    state.getCurrentProject(),
    state.setCurrentProject,
  ]);

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [projectData]);

  return (
    project?.id === Number(id) && (
      <>
        <Link href={`/data-custodian/profile/projects`}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <ArrowBackIcon />
            <Typography sx={{ ml: 1, textDecoration: "underline" }}>
              {t("backToProjects")}
            </Typography>
          </Box>
        </Link>
        <PageBodyContainer heading={project.title}>
          <SubTabsContents tabId={tabId} subTabId={subTabId} id={id} />
        </PageBodyContainer>
      </>
    )
  );
}
