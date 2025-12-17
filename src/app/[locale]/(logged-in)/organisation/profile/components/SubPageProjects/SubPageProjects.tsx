import { useStore } from "@/data/store";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { ResearcherProject } from "@/types/application";
import { useEffect } from "react";
import StatusList from "@/components/StatusList";
import Guidance from "@/components/Guidance";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import ActionsPanel from "@/components/ActionsPanel";
import { Box, Button, Typography } from "@mui/material";
import { useFeatures } from "@/components/FeatureProvider";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import patchSponsorshipStatusQuery from "@/services/organisations/patchSponorshipStatusQuery";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import SubTabsContents from "../SubsTabContents";
import SubTabsSections from "../SubTabSections";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";

interface PageProps {
  projectData: ResearcherProject;
  params: {
    subTabId: ProjectsSubTabs;
    id?: number;
  };
}

export default function SubPageProjects({ params, projectData }: PageProps) {
  const tabId = PageTabs.PROJECTS;

  const { isSponsorship } = useFeatures();
  const { organisation, project, setProject } = useStore(state => ({
    organisation: state.getOrganisation(),
    project: state.getCurrentProject(),
    setProject: state.setCurrentProject,
  }));

  const { mutate, ...queryState } = useMutation(patchSponsorshipStatusQuery());

  useQueryAlerts(queryState);

  useEffect(() => {
    setProject(projectData);
  }, [projectData]);

  const guidance = mockedSafeProjectGuidanceProps;

  const handleUpdateStatus = (status: "approved" | "rejected") => {
    mutate({
      params: {
        organisationId: organisation.id,
      },
      payload: {
        status,
        project_id: project.id,
      },
    });
  };

  return (
    project && (
      <PageBodyContainer
        heading={`${projectData.title} (${projectData.unique_id})`}>
        <PageColumns>
          <PageColumnBody lg={8}>
            <SubTabsSections id={project.id} tabId={tabId} {...params} />
            <SubTabsContents tabId={tabId} {...params} />
          </PageColumnBody>
          <PageColumnDetails lg={4}>
            <StatusList projectStatus={project?.model_state.state.slug} />
            {isSponsorship && (
              <ActionsPanel sx={{ mb: 2 }}>
                <Typography variant="h3">Pending sponsorship</Typography>
                <Typography>
                  The Safe People Registry supports Organisations that take
                  formal responsibility for research projects involving
                  sensitive data. This is called sponsoring a project.
                </Typography>

                <Typography>
                  When your Organisation confirms sponsorship of a project, you
                  are formally accepting legal accountability for ensuring that:
                </Typography>

                <ul>
                  <li>
                    The research project has been reviewed and is appropriately
                    designed, managed, and monitored.
                  </li>

                  <li>
                    The Chief Investigator is suitably qualified and supported
                    to lead the research.
                  </li>

                  <li>
                    All relevant legal, ethical, and regulatory responsibilities
                    are being met by your Organisation.
                  </li>

                  <li>
                    Any delegation of Sponsor responsibilities is clearly
                    documented and agreed.
                  </li>
                </ul>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Button
                    variant="contained"
                    sx={{ alignSelf: "flex-start" }}
                    startIcon={<CheckOutlined />}
                    onClick={() => {
                      handleUpdateStatus("approved");
                    }}>
                    Confirm sponsorship
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ alignSelf: "flex-start" }}
                    startIcon={<CloseOutlined />}
                    onClick={() => {
                      handleUpdateStatus("rejected");
                    }}>
                    Decline sponsorship
                  </Button>
                </Box>
              </ActionsPanel>
            )}
            <Guidance {...guidance} isCollapsible={false} infoWidth="100%" />
          </PageColumnDetails>
        </PageColumns>
      </PageBodyContainer>
    )
  );
}
