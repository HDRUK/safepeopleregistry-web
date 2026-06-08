import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import CustodianProjectOrganisation from "./components/CustodianProjectOrganisation";

export const metadata: Metadata = {
  title: `Project Organisation Details | ${SITE_NAME}`,
  description:
    "View the profile and manage validation of an organisation on a project at your custodian.",
};

interface PageProps {
  params: {
    id: number;
    projectOrganisationId: number;
    subTabId: string;
  };
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
