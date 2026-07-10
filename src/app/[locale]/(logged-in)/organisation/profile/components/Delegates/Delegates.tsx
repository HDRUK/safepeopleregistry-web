"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { DEFAULT_STALE_TIME } from "@/consts/requests";
import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import { getOrganisationDelegatesQuery } from "@/services/organisations";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import DelegateTable from "../DelegateTable";
import { Typography } from "@mui/material";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function Delegates() {
  const { organisation } = useStore(state => ({
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
        description={
          <Typography>{tProfile("adminTeamDescription")}</Typography>
        }>
        <DelegateTable {...queryState} />
      </PageBody>
    </LoadingWrapper>
  );
}
