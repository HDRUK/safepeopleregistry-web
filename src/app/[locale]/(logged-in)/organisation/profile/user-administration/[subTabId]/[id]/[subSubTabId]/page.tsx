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
  params: Promise<{
    id: number;
    subSubTabId: UserSubTabs;
  }>;
  searchParams?: Promise<{
    affiliation?: string;
  }>;
}

async function OrganisationUserPage({ params, searchParams }: PageProps) {
  const { id: userId, subSubTabId } = await params;
  // A user can have several affiliations to the Organisation, so the one being viewed is in the URL
  const affiliationId = Number((await searchParams)?.affiliation) || undefined;

  return (
    <OrganisationUser
      userId={userId}
      subSubTabId={subSubTabId}
      affiliationId={affiliationId}
    />
  );
}

export default OrganisationUserPage;
