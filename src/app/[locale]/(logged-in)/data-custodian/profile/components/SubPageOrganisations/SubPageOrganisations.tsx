import { useStore } from "@/data/store";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { Organisation } from "@/types/application";
import { useEffect } from "react";
import ActionValidationPanel from "@/organisms/ActionValidationPanel";
import { ActionValidationVariants } from "@/organisms/ActionValidationPanel/ActionValidationPanel";
import { useQuery } from "@tanstack/react-query";
import { getCustodianOrganisationValidationLogsQuery } from "@/services/validation_logs";
import { PageTabs, OrganisationsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  organisationData: Organisation;
  params: {
    subTabId: OrganisationsSubTabs;
    id?: number;
  };
}

export default function SubPageOrganisations({
  params,
  organisationData,
}: PageProps) {
  const tabId = PageTabs.ORGANISATIONS;

  const [custodian, organisation, setOrganisation] = useStore(state => [
    state.getCustodian(),
    state.getCurrentOrganisation(),
    state.setCurrentOrganisation,
  ]);

  useEffect(() => {
    setOrganisation(organisationData);
  }, [organisationData]);

  const { data: validationLogs, ...queryState } = useQuery({
    ...getCustodianOrganisationValidationLogsQuery(
      custodian?.id as number,
      organisation?.id as number
    ),
    enabled: !!organisation?.id,
  });

  return (
    organisation && (
      <PageBodyContainer heading={organisation.organisation_name}>
        <PageColumns>
          <PageColumnBody size={{ lg: 8 }}>
            <SubTabsSections id={organisation.id} tabId={tabId} {...params} />
            <SubTabsContents tabId={tabId} {...params} />
          </PageColumnBody>
          <PageColumnDetails size={{ lg: 4 }}>
            <ActionValidationPanel
              variant={ActionValidationVariants.Organisation}
              queryState={queryState}
              logs={validationLogs?.data || []}
            />
          </PageColumnDetails>
        </PageColumns>
      </PageBodyContainer>
    )
  );
}
