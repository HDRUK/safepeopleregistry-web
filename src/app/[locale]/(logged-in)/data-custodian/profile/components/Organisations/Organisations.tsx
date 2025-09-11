"use client";

import { useStore } from "@/data/store";
import useStorePaginatedQueryParams from "@/hooks/useStorePaginatedQueryParams";
import PageBody from "@/modules/PageBody";
import PageBodyContainer from "@/modules/PageBodyContainer";
import ProjectOrganisations from "@/organisms/ProjectOrganisations";
import { EntityType } from "@/types/api";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";

export default function Organisations() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const { custodianId, nameRoute } = useStore(state => ({
    custodianId: state.getCustodian()?.id,
    nameRoute:
      state.getApplication().routes.profileCustodianOrganisationsPeople,
  }));

  const paginatedQueryParams = useStorePaginatedQueryParams();

  return (
    <PageBodyContainer heading={tProfile("organisationsListTitle")}>
      <PageBody description={tProfile("organisationsListDescription")}>
        <ProjectOrganisations
          variant={EntityType.CUSTODIAN}
          custodianId={custodianId}
          routes={{
            name: nameRoute,
          }}
          paginatedQueryParams={paginatedQueryParams}
        />
      </PageBody>
    </PageBodyContainer>
  );
}
