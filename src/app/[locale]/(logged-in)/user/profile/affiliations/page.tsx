import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { responseToQueryState } from "@/utils/query";
import { putVerifyEmail } from "@/app/actions/affiliations";
import AffiliationsPage from "../components/AffiliationsPage";
import { PageTabs } from "../consts/tabs";

export const metadata: Metadata = {
  title: `Affiliations | ${SITE_NAME}`,
  description:
    "Manage your organisational affiliations on Safe People Registry.",
};

interface PageProps {
  searchParams?: Promise<{
    verify?: string;
  }>;
}

async function Page({ searchParams }: PageProps) {
  const verify = (await searchParams)?.verify;

  const queryState = verify
    ? responseToQueryState(
        await putVerifyEmail(verify, {
          suppressThrow: true,
        })
      )
    : {};

  return (
    <AffiliationsPage
      queryState={queryState}
      params={{
        tabId: PageTabs.AFFILIATIONS,
      }}
    />
  );
}

export default Page;
