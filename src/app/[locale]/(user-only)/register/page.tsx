import { PendingInvite } from "@/consts/application";
import { UserGroup } from "@/consts/user";
import { PageBody } from "@/modules";
import { getMeUnclaimed } from "@/services/auth";
import { getPendingInvite, putEmailByInvite } from "@/services/users";
import { getDecodedAccessToken } from "@/utils/auth";
import { redirectProfile } from "@/utils/router";
import { cookies } from "next/headers";
import Register from "./components/Register";

async function Page({ searchParams }: { searchParams: { type?: UserGroup } }) {
  await redirectProfile();

  const accessToken = await getDecodedAccessToken();
  const cookieStore = await cookies();
  const inviteCode = cookieStore.get("invite_code")?.value;

  let unclaimedUser;
  let partialUser;

  if (accessToken) {
    const { data } = await getMeUnclaimed(inviteCode, {
      suppressThrow: true,
    });

    unclaimedUser = data;

    const { email, given_name, family_name } = accessToken;

    partialUser = { email, given_name, family_name };
  }

  if (inviteCode && accessToken) {
    const { data } = await getPendingInvite(inviteCode, {
      suppressThrow: true,
    });

    if (
      data?.user_id &&
      accessToken.email &&
      data?.status === PendingInvite.PENDING
    ) {
      await putEmailByInvite(
        inviteCode,
        {
          email: accessToken.email,
        },
        {
          suppressThrow: true,
        }
      );
    }
  }

  return (
    <PageBody>
      <Register
        tokenUser={partialUser}
        unclaimedUser={unclaimedUser}
        searchParams={searchParams}
      />
    </PageBody>
  );
}

export default Page;
