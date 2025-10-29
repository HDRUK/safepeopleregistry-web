import { DefaultFormValuesMode } from "@/consts/form";
import { AddIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { useRouter } from "@/i18n/routing";
import { mockedProjectsIntro } from "@/mocks/data/cms";
import { PageBody, PageBodyContainer } from "@/modules";
import ProjectsList from "@/organisms/Projects";
import { postCustodianProjectQuery } from "@/services/custodians";
import { EntityType } from "@/types/api";
import { injectParamsIntoPath } from "@/utils/application";
import { createProjectDefaultValues } from "@/utils/form";
import { Box, Button, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "Projects";

export default function Projects() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const router = useRouter();
  const { custodianId, routes } = useStore(state => ({
    routes: state.getApplication().routes,
    custodianId: state.getCustodian()?.id,
  }));

  const { mutateAsync: mutateCreateProject, ...mutationState } = useMutation(
    postCustodianProjectQuery()
  );

  const handleCreateProject = async () => {
    const { data: id } = await mutateCreateProject({
      params: {
        custodianId,
      },
      payload: createProjectDefaultValues(
        {
          title: t("addNewProjectTitle"),
        },
        DefaultFormValuesMode.DB
      ),
    });

    const path = injectParamsIntoPath(
      routes.profileCustodianProjectsSafeProject.path,
      {
        id,
      }
    );

    router.push(path);
  };

  useQueryAlerts(mutationState, {
    showOnlyError: true,
  });

  return (
    <PageBodyContainer heading={t("projects")}>
      <PageBody
        description={
          <Box sx={{ display: "flex", gap: 4 }}>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              {mockedProjectsIntro}
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={handleCreateProject}
              sx={{ flexShrink: 0 }}>
              {t("addNewProjectButton")}
            </Button>
          </Box>
        }>
        <ProjectsList variant={EntityType.CUSTODIAN} />
      </PageBody>
    </PageBodyContainer>
  );
}
