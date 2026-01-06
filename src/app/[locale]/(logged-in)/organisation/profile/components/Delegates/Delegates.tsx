"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import Markdown from "@/components/Markdown";
import { DEFAULT_STALE_TIME } from "@/consts/requests";
import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import { getOrganisationDelegatesQuery } from "@/services/organisations";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import DelegateTable from "../DelegateTable";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function Delegates() {
  const { user, organisation } = useStore(state => ({
    user: state.getUser(),
    organisation: state.config.organisation,
  }));

  const queryState = useQuery({
    ...getOrganisationDelegatesQuery(
      organisation?.id as number,
      !!organisation
    ),
    staleTime: DEFAULT_STALE_TIME,
  });

  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <LoadingWrapper variant="basic" loading={queryState.isLoading}>
      <PageBody
        heading={
          user?.is_delegate === 0 ? null : tProfile("delegatesAdminTitle")
        }
        description={
          <Markdown>
            {user?.is_delegate === 0
              ? tProfile("delegateAdminDescription")
              : tProfile("delegateAdminDescriptionDelegate")}
          </Markdown>
        }>
        <DelegateTable {...queryState} />
      </PageBody>
    </LoadingWrapper>
  );
}
