"use client";

import UserDetails from "@/components/UserDetails";
import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import {
  PageBody,
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import ActionValidationPanel from "@/organisms/ActionValidationPanel";
import { ActionValidationVariants } from "@/organisms/ActionValidationPanel/ActionValidationPanel";
import StatusPanel from "@/organisms/StatusPanel";
import { getCustodianProjectUserQuery } from "@/services/custodian_approvals";
import { getUserQuery } from "@/services/users";
import { getCustodianProjectUserValidationLogsQuery } from "@/services/validation_logs";
import { toCamelCase } from "@/utils/string";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { UserSubTabs } from "../../../../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";
import { useParams } from "next/navigation";
import BackToResultsButton from "../../../../../components/BackToResultsButton/BackToResultsButton";

interface CustodianProjectUserProps {
  projectUserId: number;
  subTabId: UserSubTabs;
}

const NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT_USER = "CustodianProfile.User";

function CustodianProjectUser({
  projectUserId,
  subTabId,
}: CustodianProjectUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT_USER);
  const custodian = useStore(state => state.getCustodian());
  const queryClient = useQueryClient();
  // const router = useRouter();
  const params = useParams<{ projectUserId: string }>();

  const {
    data: custodianProjectUser,
    isFetched: isFetchedCustodianProjectUser,
  } = useQuery(getCustodianProjectUserQuery(custodian?.id, projectUserId));

  const { project_has_user: projectUser } = custodianProjectUser?.data || {};

  const { registry, project } = projectUser || {};

  const { data: userData, isFetched } = useQuery({
    ...getUserQuery(registry?.user?.id as number),
    enabled: !!registry?.user?.id,
  });

  if (userData?.data.user_group !== UserGroup.USERS && isFetched) {
    notFound();
  }

  const { data: validationLogs, ...queryState } = useQuery({
    ...getCustodianProjectUserValidationLogsQuery(
      custodian?.id as number,
      project?.id as number,
      registry?.id as number
    ),
    enabled: !!registry?.id,
  });

  if (!project && !projectUser && isFetchedCustodianProjectUser) {
    notFound();
  }

  const { user, setUser, setProject, setProjectUser } = useStore(state => ({
    user: state.getCurrentUser(),
    setUser: state.setCurrentUser,
    setProject: state.setCurrentProject,
    setProjectUser: state.setCurrentProjectUser,
  }));

  const handleStatusUpdate = () => {
    queryClient.refetchQueries({
      queryKey: ["getCustodianStatus", custodian?.id, +projectUserId],
    });
  };

  useEffect(() => {
    if (projectUser) setProjectUser(projectUser);
  }, [projectUser]);

  useEffect(() => {
    if (project) setProject(project);
  }, [project]);

  useEffect(() => {
    if (userData?.data) setUser(userData.data);
  }, [userData]);

  // const { history } = useStore(state => ({
  //   history: state.config.router.history,
  //   // getPreviousUrl: state.getPreviousUrl,
  // }));

  // const backHref = useMemo(() => {
  //   const fallback = "/data-custodian/profile/projectUsers";
  //   const currentUserPath = `/projectUsers/${params.projectUserId}`;

  //   for (let i = history.length - 1; i >= 0; i--) {
  //     if (!history[i].includes(currentUserPath)) {
  //       return history[i];
  //     }
  //   }
  //   return fallback;
  // }, [history, params.projectUserId]);

  // const handleBack = () => {
  //   router.back();
  // };

  // useEffect(() => {
  //   console.log({
  //     history,
  //     current: history.at(-1),
  //     previous: getPreviousUrl(),
  //   });
  // }, [history]);
  return (
    user &&
    registry && (
      <>
        <BackToResultsButton
          label={t("backToUsers")}
          // fallback="/data-custodian/profile/projectUsers"
          ignorePathSegment={`/projectUsers/${params.projectUserId}`}
        />

        <PageBodyContainer
          heading={
            <>
              {t("heading", {
                projectTitle: project?.title,
              })}
            </>
          }>
          <PageColumns>
            <PageColumnBody size={{ lg: 8 }}>
              <UserDetails projectUser={projectUser} />

              <SubTabsSections
                projectUserId={projectUserId}
                subTabId={subTabId}
              />
              <PageBody heading={t(toCamelCase(subTabId))}>
                <SubTabsContents registryId={registry.id} subTabId={subTabId} />
              </PageBody>
            </PageColumnBody>
            <PageColumnDetails size={{ lg: 4 }}>
              <StatusPanel variant={ActionValidationVariants.ProjectUser} />
              <ActionValidationPanel
                variant={ActionValidationVariants.ProjectUser}
                queryState={queryState}
                logs={validationLogs?.data || []}
                onStatusChange={handleStatusUpdate}
              />
            </PageColumnDetails>
          </PageColumns>
        </PageBodyContainer>
      </>
    )
  );
}

export default CustodianProjectUser;
