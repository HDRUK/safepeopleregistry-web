"use client";

import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { User } from "../../types/application";
import useApplicationDependencies from "../../queries/useApplicationDependencies";
import useQueriesHistories from "../../queries/useQueriesHistories";
import { getCombinedQueryState } from "../../utils/query";
import ApplicationData from "../ApplicationData";
import ContactLink from "../../components/ContactLink";
import LoadingWrapper from "../../components/LoadingWrapper";
import OverlayCenterAlert from "../../components/OverlayCenterAlert";
import PageBodyContainer from "../PageBodyContainer";

interface ApplicationProps {
  children: ReactNode;
  custodianId?: number;
  organisationId?: number;
  me?: User;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function Application({
  children,
  me,
  custodianId,
  organisationId,
}: ApplicationProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const { data: applicationData, ...applicationQueryState } =
    useApplicationDependencies(
      {
        user: me,
        custodianId,
        organisationId,
      },
      {
        queryKeySuffix: ["initial"],
        enabled: !!me,
      }
    );

  const { data: historiesData, ...historiesQueryState } = useQueriesHistories(
    me?.registry_id,
    {
      queryKeySuffix: ["initial"],
      enabled: !!me?.registry_id,
    }
  );

  const {
    getAccreditations: accreditationsData,
    getEducations: educationData,
    getTrainings: trainingData,
    getUserApprovedProjects: projectsData,
    getAffiliations: affiliationData,
    getProfessionalRegistrations: professionalRegistrationsData,
  } = historiesData;

  const {
    getSystemConfig: systemConfigData,
    getUser: userData,
    getOrganisation: organisationData,
    getSectors: sectorsData,
    getPermissions: permissionsData,
    getCustodian: custodianData,
    getProjectRoles: projectRolesData,
  } = applicationData;

  const { isLoading, isError } = getCombinedQueryState([
    historiesQueryState,
    applicationQueryState,
  ]);

  const hasMissingDepedencyInformation = () => {
    return (
      sectorsData?.data.data?.length === 0 ||
      permissionsData?.data.data?.length === 0 ||
      systemConfigData?.data?.length === 0 ||
      projectRolesData?.data.length === 0
    );
  };

  return isError || hasMissingDepedencyInformation() ? (
    <PageBodyContainer>
      <OverlayCenterAlert>
        {t.rich("getDependenciesError", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    </PageBodyContainer>
  ) : (
    <LoadingWrapper loading={isLoading} variant="basic">
      <ApplicationData
        isOrganisation={!!organisationId}
        isCustodian={!!custodianId}
        systemConfigData={systemConfigData?.data}
        userData={userData?.data}
        organisationData={organisationData?.data}
        sectorsData={sectorsData?.data.data}
        permissionsData={permissionsData?.data.data}
        projectRolesData={projectRolesData?.data}
        custodianData={custodianData?.data}
        accreditationsData={accreditationsData?.data.data}
        educationData={educationData?.data}
        trainingData={trainingData?.data}
        projectsData={projectsData?.data}
        affiliationData={affiliationData?.data.data}
        professionalRegistrationsData={
          professionalRegistrationsData?.data?.data
        }>
        {children}
      </ApplicationData>
    </LoadingWrapper>
  );
}
