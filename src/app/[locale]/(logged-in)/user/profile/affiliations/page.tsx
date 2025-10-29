import putVerifyEmail from "@/services/affiliations/putVerifyEmail";
import { responseToQueryState } from "@/utils/query";
import AffiliationsPage from "../components/AffiliationsPage";
import { PageTabs } from "../consts/tabs";

interface PageProps {
  searchParams?: Promise<{
    verify?: string;
  }>;
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const verify = params?.verify;

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
