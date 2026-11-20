"use client";

import Markdown from "@/components/Markdown";
import { useStore } from "@/data/store";
import useIsCustodianViewOnly from "@/hooks/useIsCustodianViewOnly";
import useStorePaginatedQueryParams from "@/hooks/useStorePaginatedQueryParams";
import PageBody from "@/modules/PageBody";
import PageBodyContainer from "@/modules/PageBodyContainer";
import ProjectUsers from "@/organisms/ProjectUsers";
import { EntityType } from "@/types/api";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";

function Users() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const { custodianId, nameRoute } = useStore(state => ({
    custodianId: state.getCustodian()?.id,
    nameRoute:
      state.getApplication().routes.profileCustodianUsersCustodianOrgInfo,
  }));

  const paginatedQueryParams = useStorePaginatedQueryParams();
  const isViewOnly = useIsCustodianViewOnly();

  return (
    <PageBodyContainer
      heading={tProfile("usersListTitle")}
      description={<Markdown>{tProfile("usersListDescription")}</Markdown>}>
      <PageBody>
        <ProjectUsers
          readOnly={isViewOnly}
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

export default Users;
