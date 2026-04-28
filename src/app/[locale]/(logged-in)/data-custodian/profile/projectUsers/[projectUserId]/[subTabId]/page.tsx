import { UserSubTabs } from "@/app/[locale]/(logged-in)/data-custodian/profile/consts/tabs";
import CustodianProjectUser from "./components/CustodianProjectUser";

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
