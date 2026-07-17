"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Form from "@/components/Form";
import Guidance from "@/components/Guidance";
import LoadingWrapper from "@/components/LoadingWrapper";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedUserTrainingGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import ProfessionalRegistrations from "@/modules/ProfessionalRegistrations";
import AccreditedResearcherRegs from "@/organisms/AccreditedResearcherRegs/AccreditedResearcherRegs";
import Training from "@/organisms/Training";
import { getUserQuery, putUserQuery } from "@/services/users";
import { EntityType } from "@/types/api";
import { User } from "@/types/application";
import { Box } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Trainings() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const router = useRouter();

  const { user, routes } = useStore(state => ({
    user: state.config.user,
    routes: state.getApplication().routes,
  }));

  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);

  const { professionalRegistrations } = useStore(state => ({
    professionalRegistrations:
      state.config.histories?.professionalRegistrations || [],
  }));

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery(getUserQuery(user?.id));

  const { mutateAsync: putUser, ...putUserQueryState } = useMutation(
    putUserQuery(user?.id ?? -1)
  );

  useQueryAlerts(putUserQueryState, {
    errorAlertProps: {
      text: <ErrorMessage t={tProfile} tKey="postUserError" />,
    },
    successAlertProps: {
      text: tProfile("postUserSuccess"),
    },
  });

  const handleSubmit = async (data: Partial<User>) => {
    await putUser(data);
    refetch();
    router.push(ROUTES.profileResearcherHome.path);
  };

  return (
    <LoadingWrapper variant="basic" loading={isLoading}>
      <Form onSubmit={handleSubmit} key={userData?.data?.id}>
        <PageBodyContainer heading={tProfile("trainingTitle")}>
          <PageColumns>
            <PageColumnBody size={{ lg: 8 }}>
              <PageBody heading={tProfile("trainingAndAccreditations")}>
                <PageSection>
                  <Training
                    variant={EntityType.USER}
                    user={userData?.data}
                    setHistories={setHistories}
                    getHistories={getHistories}
                  />
                </PageSection>
                <PageSection>
                  <AccreditedResearcherRegs
                    variant={EntityType.USER}
                    user={userData?.data}
                    setHistories={setHistories}
                    getHistories={getHistories}
                    registryId={user.registry_id}
                  />
                </PageSection>
                <PageSection>
                  <ProfessionalRegistrations
                    variant={EntityType.USER}
                    user={userData?.data}
                    setHistories={setHistories}
                    getHistories={getHistories}
                    professionalRegistrations={professionalRegistrations}
                  />
                </PageSection>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                  <ProfileNavigationFooter
                    previousHref={routes.profileResearcherAffiliations.path}
                    nextStepText={tProfile("completeYourProfile")}
                    isLastStep
                    isLoading={putUserQueryState.isPending}
                  />
                </Box>
              </PageBody>
            </PageColumnBody>
            <PageColumnDetails size={{ lg: 4 }}>
              <Guidance
                {...mockedUserTrainingGuidanceProps}
                isCollapsible={false}
                infoWidth="100%"
              />
            </PageColumnDetails>
          </PageColumns>
        </PageBodyContainer>
      </Form>
    </LoadingWrapper>
  );
}
