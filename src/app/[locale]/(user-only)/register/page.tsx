import { PageBody } from "@/modules";
import { SearchParams } from "@/types/query";
import { cookies } from "next/headers";
import AccountConfirm from "./components/AccountConfirm/AccountConfirm";

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const hasAccessToken = !!cookies().get("access_token");
  const showAccountPicker = !searchParams.type || !hasAccessToken;

  return (
    <PageBody>
      <AccountConfirm
        showAccountPicker={showAccountPicker}
        hasAccessToken={hasAccessToken}
      />
    </PageBody>
  );
}

export default Page;
