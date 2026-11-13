import { AddIcon } from "@/consts/icons";
import useIsCustodianViewOnly from "@/hooks/useIsCustodianViewOnly";
import { mockedProjectsIntro } from "@/mocks/data/cms";
import { PageBody, PageBodyContainer } from "@/modules";
import AddProjectModal from "@/organisms/AddProjectModal";
import ProjectsList from "@/organisms/Projects";
import { EntityType } from "@/types/api";
import { Box, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

const NAMESPACE_TRANSLATION = "Projects";

export default function Projects() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const isViewOnly = useIsCustodianViewOnly();

  return (
    <PageBodyContainer heading={t("projects")}>
      <PageBody
        description={
          <Box sx={{ display: "flex", gap: 4 }}>
            <Typography sx={{ flexGrow: 1 }}>{mockedProjectsIntro}</Typography>
            {!isViewOnly && (
              <Button
                startIcon={<AddIcon />}
                onClick={() => setShowAddProjectModal(!showAddProjectModal)}
                sx={{ flexShrink: 0 }}>
                {t("addNewProjectButton")}
              </Button>
            )}
          </Box>
        }>
        <ProjectsList variant={EntityType.CUSTODIAN} />
      </PageBody>

      {!isViewOnly && (
        <AddProjectModal
          open={showAddProjectModal}
          onClose={() => setShowAddProjectModal(false)}
        />
      )}
    </PageBodyContainer>
  );
}
