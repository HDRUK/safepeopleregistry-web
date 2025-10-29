"use client";

import CustodianProjectOrganisation from "./components/CustodianProjectOrganisation";

interface PageProps {
  params: Promise<{
    id: number;
    projectOrganisationId: number;
    subTabId: string;
  }>;
}

async function CustodianProjectOrganisationsPage({ params }: PageProps) {
  const { projectOrganisationId, subTabId } = await params;

  return (
    <CustodianProjectOrganisation
      projectOrganisationId={projectOrganisationId}
      subTabId={subTabId}
    />
  );
}

export default CustodianProjectOrganisationsPage;
