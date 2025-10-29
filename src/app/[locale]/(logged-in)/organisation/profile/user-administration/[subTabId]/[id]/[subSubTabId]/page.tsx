import { UserSubTabs } from "../../../../consts/tabs";
import OrganisationUser from "./components";

interface PageProps {
  params: Promise<{
    id: number;
    subSubTabId: UserSubTabs;
  }>;
}

async function OrganisationUserPage({ params }: PageProps) {
  const { id: userId, subSubTabId } = await params;

  return <OrganisationUser userId={userId} subSubTabId={subSubTabId} />;
}

export default OrganisationUserPage;
