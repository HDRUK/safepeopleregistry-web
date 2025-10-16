import StatusList from "@/components/StatusList";
import { useStore } from "@/data/store";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import ActionValidationPanel from "@/organisms/ActionValidationPanel";
import { ActionValidationVariants } from "@/organisms/ActionValidationPanel/ActionValidationPanel";
import { getCustodianProjectOrganisationQuery } from "@/services/custodian_approvals";
import { getOrganisationQuery } from "@/services/organisations";
import { getCustodianOrganisationValidationLogsQuery } from "@/services/validation_logs";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { OrganisationsSubTabs } from "../../../../../consts/tabs";
import SubTabsContents from "../SubsTabContents";
import SubTabsSections from "../SubTabSections";
import { Status } from "@/consts/application";

interface CustodianProjectUserProps {
  projectOrganisationId: number;
  subTabId: OrganisationsSubTabs;
}

function CustodianProjectOrganisation({
  projectOrganisationId,
  subTabId,
}: CustodianProjectUserProps) {
  const custodian = useStore(state => state.getCustodian());

  const {
    data: custodianProjectOrganisation,
    isFetched: isFetchedCustodianProjectOrganisation,
  } = useQuery(
    getCustodianProjectOrganisationQuery(
      custodian?.id as number,
      projectOrganisationId
    )
  );

  const { project_organisation: projectOrganisation, model_state: state } =
    custodianProjectOrganisation?.data || {};

  const { data: organisationData, isFetched } = useQuery({
    ...getOrganisationQuery(
      custodianProjectOrganisation?.data.project_organisation.organisation
        .id as number
    ),
    enabled: isFetchedCustodianProjectOrganisation,
  });

  if (!organisationData?.data && isFetched) {
    notFound();
  }

  const { organisation, setOrganisation, setProjectOrganisation } = useStore(
    state => ({
      organisation: state.getCurrentOrganisation(),
      setOrganisation: state.setCurrentOrganisation,
      setProjectOrganisation: state.setCurrentProjectOrganisation,
    })
  );

  const { data: validationLogs, ...queryState } = useQuery({
    ...getCustodianOrganisationValidationLogsQuery(
      custodian?.id as number,
      organisation?.id as number
    ),
    enabled: !!organisation?.id,
  });

  useEffect(() => {
    if (projectOrganisation) setProjectOrganisation(projectOrganisation);
  }, [projectOrganisation]);

  useEffect(() => {
    if (organisationData?.data) setOrganisation(organisationData.data);
  }, [organisationData]);

  return (
    organisation && (
      <PageBodyContainer heading={organisation.organisation_name}>
        <PageColumns>
          <PageColumnBody lg={8}>
            <SubTabsSections
              projectOrganisationId={projectOrganisationId}
              subTabId={subTabId}
            />
            <SubTabsContents subTabId={subTabId} />
          </PageColumnBody>
          <PageColumnDetails lg={4}>
            <StatusList organisationStatus={state?.state.slug || Status.NONE} />
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

export default CustodianProjectOrganisation;
