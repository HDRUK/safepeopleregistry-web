import SubPage from "../../components/SubPage";
import { UserAdminPageSubTabs, PageTabs } from "../../consts/tabs";

interface UserAdminPageProps {
  params: Promise<{
    subTabId: UserAdminPageSubTabs;
  }>;
}

async function UserAdminPage({ params }: UserAdminPageProps) {
  const { subTabId } = await params;

  return (
    <SubPage
      params={{
        tabId: PageTabs.USER_ADMINISTRATION,
        subTabId,
      }}
    />
  );
}

export default UserAdminPage;
