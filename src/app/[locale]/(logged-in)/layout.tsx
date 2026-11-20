import getCustodianUser from "@/app/actions/custodian_users/getCustodianUser";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { PageContainer } from "@/modules";
import Application from "@/organisms/Application";
import { User } from "@/types/application";
import { isCustodianUserViewOnly } from "@/utils/custodian";
import redirectApplication, { getPathServerSide } from "@/utils/router";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren;

async function getCustodianDetails(user: User) {
  let custodianId = user?.custodian_id;
  let isCustodianViewOnly = false;

  if (user.custodian_user_id) {
    const custodianUser = await getCustodianUser(user.custodian_user_id);

    custodianId = custodianUser?.data.custodian_id;
    isCustodianViewOnly = isCustodianUserViewOnly(custodianUser?.data);
  }

  return { custodianId, isCustodianViewOnly };
}

async function redirectViewerFromLanding() {
  const pathname = await getPathServerSide();
  const locale = await getLocale();

  if (pathname === `/${locale}${ROUTES.profileCustodian.path}`) {
    redirect(ROUTES.profileCustodianProjects.path);
  }
}

export default async function Layout({ children }: LayoutProps) {
  let custodianId;
  let isCustodianViewOnly = false;
  let organisationId;

  const me = await redirectApplication();

  if (me) {
    if (me.user_group === UserGroup.CUSTODIANS) {
      ({ custodianId, isCustodianViewOnly } = await getCustodianDetails(me));

      if (isCustodianViewOnly) await redirectViewerFromLanding();
    } else if (me.user_group === UserGroup.ORGANISATIONS) {
      organisationId = me.organisation_id;
    }
  }

  return (
    <Application
      custodianId={custodianId}
      isCustodianViewOnly={isCustodianViewOnly}
      organisationId={organisationId}
      me={me}>
      <PageContainer>{children}</PageContainer>
    </Application>
  );
}
