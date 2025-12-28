import { WithParams } from "@/types/application";
import { UserSubTabs } from "../../../consts/tabs";
import CustodianProjectUser from "./components/CustodianProjectUser";

type PageProps = WithParams<{
  projectUserId: number;
  subTabId: UserSubTabs;
}>;

async function CustodianProjectUserPage({ params }: PageProps) {
  const { subTabId, projectUserId } = await params;

  return (
    <CustodianProjectUser projectUserId={projectUserId} subTabId={subTabId} />
  );
}

export default CustodianProjectUserPage;
