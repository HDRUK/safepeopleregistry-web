import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { UserSubTabs } from "../../../../consts/tabs";
import OrganisationUser from "./components";

export const metadata: Metadata = {
  title: `Researcher Profile | ${SITE_NAME}`,
  description:
    "View the profile of a researcher associated with your organisation and perform affiliation.",
};

interface PageProps {
  params: {
    id: number;
    subSubTabId: UserSubTabs;
  };
}

async function OrganisationUserPage({ params }: PageProps) {
  const { id: userId, subSubTabId } = await params;

  return <OrganisationUser userId={userId} subSubTabId={subSubTabId} />;
}

export default OrganisationUserPage;
