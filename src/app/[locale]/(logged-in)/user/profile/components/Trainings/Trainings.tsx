"use client";

import Form from "@/components/Form";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import LoadingWrapper from "@/components/LoadingWrapper";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedUserTrainingGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import Training from "@/organisms/Training";
import { getUserQuery, putUserQuery } from "@/services/users";
import { User } from "@/types/application";
import { EntityType } from "@/types/api";
import { Box, Link } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import ProfessionalRegistrations from "@/modules/ProfessionalRegistrations";
import ErrorMessage from "@/components/ErrorMessage";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

const RESEARCHER_DECLARATION_LINK =
  "https://uksa.statisticsauthority.gov.uk/digitaleconomyact-research-statistics/better-useofdata-for-research-information-for-researchers/list-of-accredited-researchers-and-research-projects-under-the-research-strand-of-the-digital-economy-act/";
const USER_DECLARATION_LINK =
  "https://www.gov.uk/government/publications/digital-economy-act-2017-part-5-codes-of-practice/research-code-of-practice-and-accreditation-criteria";

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

  const formOptions = useMemo(
    () => ({
      defaultValues: {
        uksa_registered: !!userData?.data?.uksa_registered,
        declaration_signed: !!userData?.data?.declaration_signed,
      },
    }),
    [userData?.data?.uksa_registered, userData?.data?.declaration_signed]
  );

  return (
    <LoadingWrapper variant="basic" loading={isLoading}>
      <Form {...formOptions} onSubmit={handleSubmit} key={userData?.data?.id}>
        <PageBodyContainer heading={tProfile("trainingTitle")}>
          <PageGuidance {...mockedUserTrainingGuidanceProps}>
            <PageBody>
              <PageSection>
                <Training
                  variant={EntityType.USER}
                  user={userData?.data}
                  setHistories={setHistories}
                  getHistories={getHistories}
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

              <Box sx={{ mt: 1, maxWidth: "50%" }}>
                <FormControlCheckbox
                  name="uksa_registered"
                  label={tProfile("accreditedResearcherCheckboxLabel")}
                  labelCaption={
                    <Link
                      href={RESEARCHER_DECLARATION_LINK}
                      color="primary"
                      target="_blank"
                      sx={{ display: "block", mt: 0.5, fontSize: "medium" }}>
                      {tProfile("findOutMore")}
                    </Link>
                  }
                />
              </Box>

              <Box sx={{ mt: 1, maxWidth: "50%" }}>
                <FormControlCheckbox
                  name="declaration_signed"
                  label={tProfile("userDeclarationCheckboxLabel")}
                  labelCaption={
                    <Link
                      href={USER_DECLARATION_LINK}
                      color="primary"
                      target="_blank"
                      sx={{ display: "block", mt: 0.5, fontSize: "medium" }}>
                      {tProfile("findOutMore")}
                    </Link>
                  }
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <ProfileNavigationFooter
                  previousHref={routes.profileResearcherAffiliations.path}
                  nextStepText={tProfile("completeYourProfile")}
                  isLastStep
                  isLoading={putUserQueryState.isPending}
                />
              </Box>
            </PageBody>
          </PageGuidance>
        </PageBodyContainer>
      </Form>
    </LoadingWrapper>
  );
}
