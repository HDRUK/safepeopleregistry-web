"use client";

import {
  PageColumnDetails,
  PageBodyContainer,
  PageColumnBody,
  PageColumns,
  PageBody,
} from "@/modules";
import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
// import { getCustodianProjectUserValidationLogsQuery } from "@/services/validation_logs";
import UserDetails from "@/components/UserDetails";
import { getUserQuery } from "@/services/users";
// import ActionValidationPanel from "@/modules/ActionValidationPanel";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import ConfirmAffiliation from "@/organisms/ConfirmAffiliation";
import { getOrganisationAffiliationQuery } from "@/services/affiliations";
import StatusList from "@/components/StatusList";
import { toCamelCase } from "@/utils/string";
import { UserSubTabs } from "../../../../../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface OrganisationUserProps {
  userId: number;
  subSubTabId: UserSubTabs;
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation.User";

function OrganisationUser({ userId, subSubTabId }: OrganisationUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const queryClient = useQueryClient();

  const { data: userData, isFetched } = useSuspenseQuery(getUserQuery(+userId));

  if (userData?.data.user_group !== UserGroup.USERS && isFetched) {
    notFound();
  }

  // Commented out for now as the correct query is not available yet
  // const { registry_id: registryId } = userData?.data || {};

  // const { data: validationLogs, ...queryState } = useQuery({
  //   ...getCustodianProjectUserValidationLogsQuery(
  //     custodian?.id as number,
  //     // projectId,
  //     registryId as number
  //   ),
  //   enabled: !!registryId,
  // });

  const [user, setUser, organisation] = useStore(state => [
    state.getCurrentUser(),
    state.setCurrentUser,
    state.getOrganisation(),
  ]);

  useEffect(() => {
    if (userData?.data) setUser(userData?.data);
  }, [userData]);

  const { data: affiliationData, refetch } = useQuery(
    getOrganisationAffiliationQuery(
      user?.registry_id as number,
      organisation?.id as number,
      {
        enabled: !!user?.registry_id,
      }
    )
  );

  const handleRefetch = () => {
    queryClient.refetchQueries({
      queryKey: ["getAffiliations", user?.registry_id],
    });

    refetch();
  };

  const affiliation = affiliationData?.data;

  return (
    user && (
      <PageBodyContainer heading={t("heading")}>
        <PageColumns>
          <PageColumnBody lg={8}>
            <UserDetails
              user={user}
              organisation={organisation}
              affiliation={affiliation}
            />
            <SubTabsSections userId={userId} subTabId={subSubTabId} />
            <PageBody heading={t(toCamelCase(subSubTabId))}>
              <SubTabsContents
                registryId={user.registry.id}
                subTabId={subSubTabId}
              />
            </PageBody>
          </PageColumnBody>
          <PageColumnDetails lg={4}>
            <StatusList
              affiliationStatus={affiliation?.model_state.state.slug}
            />
            {affiliation && (
              <ConfirmAffiliation
                affiliation={affiliation}
                onSuccess={handleRefetch}
              />
            )}
          </PageColumnDetails>
        </PageColumns>
      </PageBodyContainer>
    )
  );
}

export default OrganisationUser;
