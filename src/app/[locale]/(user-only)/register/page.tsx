import { PageBody } from "@/modules";
import { cookies } from "next/headers";
import { getMe } from "@/services/auth";
import { getProfileRedirectPath } from "@/utils/redirects";
import { redirect } from "next/navigation";
import { SearchParams } from "@/types/query";
import AccountConfirm from "./components/AccountConfirm/AccountConfirm";

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const hasAccessToken = !!cookies().get("access_token");
  const showAccountPicker = !searchParams.type || !hasAccessToken;

  const { data } = await getMe({ suppressThrow: true });

  // Redirect to profile if already logged in with user
  if (data) {
    const redirectUrl = await getProfileRedirectPath(data);
    redirect(redirectUrl);
  }

  return (
    <PageBody>
      <AccountConfirm
        showAccountPicker={showAccountPicker}
        hasAccessToken={hasAccessToken}
        pendingAccount={hasAccessToken && !data}
      />
    </PageBody>
  );
}

export default Page;
