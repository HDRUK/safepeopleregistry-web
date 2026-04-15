import { responseToQueryState } from "@/utils/query";
import { putVerifyEmail } from "@/app/actions/affiliations";
import AffiliationsPage from "../components/AffiliationsPage";
import { PageTabs } from "../consts/tabs";

interface PageProps {
  searchParams?: {
    verify?: string;
  };
}

async function Page({ searchParams }: PageProps) {
  const verify = searchParams?.verify;

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
