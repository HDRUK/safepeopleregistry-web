import SubPage from "../../components/SubPage";
import { UserAdminPageSubTabs, PageTabs } from "../../consts/tabs";

interface UserAdminPageProps {
  params: {
    subTabId: UserAdminPageSubTabs;
  };
}

function UserAdminPage({ params: { subTabId } }: UserAdminPageProps) {
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
