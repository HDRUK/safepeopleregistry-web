import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import SubPage from "../../components/SubPage";
import { UserAdminPageSubTabs, PageTabs } from "../../consts/tabs";

export const metadata: Metadata = {
  title: `User Administration | ${SITE_NAME}`,
  description:
    "View and manage researcher/innovator accounts associated with your organisation on Safe People Registry.",
};

interface UserAdminPageProps {
  params: {
    subTabId: UserAdminPageSubTabs;
  };
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
