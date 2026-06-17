import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { PendingInvite } from "@/consts/application";
import { UserGroup } from "@/consts/user";
import { PageBody } from "@/modules";
import { getDecodedAccessToken } from "@/utils/auth";
import { redirectProfile } from "@/utils/router";
import { cookies } from "next/headers";
import { getMeUnclaimed } from "@/app/actions/auth";
import { getPendingInvite, putEmailByInvite } from "@/app/actions/users";
import Register from "./components/Register";

export const metadata: Metadata = {
  title: `Register | ${SITE_NAME}`,
  description:
    "Create your Safe People Registry account to get started with streamlined 'safe people' validations.",
};

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ type?: UserGroup }>;
}) {
  const params = await searchParams;
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
        searchParams={params}
      />
    </PageBody>
  );
}

export default Page;
