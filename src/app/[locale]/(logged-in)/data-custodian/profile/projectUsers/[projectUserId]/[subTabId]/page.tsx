import type { Metadata } from "next";
import { UserSubTabs } from "@/app/[locale]/(logged-in)/data-custodian/profile/consts/tabs";
import { SITE_NAME } from "@/utils/metadata";
import CustodianProjectUser from "./components/CustodianProjectUser";

export const metadata: Metadata = {
  title: `Project User Details | ${SITE_NAME}`,
  description:
    "View the profile and manage validation of a researcher on a project governed by your custodian.",
};

interface PageProps {
  params: {
    id: number;
    projectUserId: number;
    subTabId: UserSubTabs;
  };
}

async function CustodianProjectUserPage({ params }: PageProps) {
  const { projectUserId, subTabId } = await params;

  return (
    <CustodianProjectUser projectUserId={projectUserId} subTabId={subTabId} />
  );
}

export default CustodianProjectUserPage;
