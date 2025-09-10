import { PageBody } from "@/modules";
import { getMeUnclaimed } from "@/services/auth";
import { getDecodedAccessToken } from "@/utils/auth";
import AccountConfirm from "./components/AccountConfirm/AccountConfirm";

async function Page() {
  const accessToken = await getDecodedAccessToken();

  let unclaimedUser;
  let partialUser;

  if (accessToken) {
    const { data } = await getMeUnclaimed({
      suppressThrow: true,
    });

    unclaimedUser = data;

    const { email, given_name, family_name } = accessToken;

    partialUser = { email, given_name, family_name };
  }

  return (
    <PageBody>
      <AccountConfirm unclaimedUser={unclaimedUser} tokenUser={partialUser} />
    </PageBody>
  );
}

export default Page;
