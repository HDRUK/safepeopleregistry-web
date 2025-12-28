"use client";

import { WithParams } from "@/types/application";
import { OrganisationsSubTabs } from "../../../consts/tabs";
import CustodianProjectOrganisation from "./components/CustodianProjectOrganisation";

type PageProps = WithParams<{
  projectOrganisationId: number;
  subTabId: OrganisationsSubTabs;
}>;

async function CustodianProjectOrganisationsPage({ params }: PageProps) {
  const { subTabId, projectOrganisationId } = await params;

  return (
    <CustodianProjectOrganisation
      projectOrganisationId={projectOrganisationId}
      subTabId={subTabId}
    />
  );
}

export default CustodianProjectOrganisationsPage;
