import { UserGroup } from "@/consts/user";
import { PageContainer } from "@/modules";
import Application from "@/organisms/Application";
import { getCustodianUser } from "@/services/custodian_users";
import { User } from "@/types/application";
import redirectApplication from "@/utils/router";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren;

async function getCustodianId(user: User) {
  let custodian_id = user?.custodian_id;

  if (user.custodian_user_id) {
    const custodianUser = await getCustodianUser(user.custodian_user_id);

    custodian_id = custodianUser?.data.custodian_id;
  }

  return custodian_id;
}

export default async function Layout({ children }: LayoutProps) {
  let custodianId;
  let organisationId;

  const me = await redirectApplication();

  if (me) {
    if (me.user_group === UserGroup.CUSTODIANS) {
      custodianId = await getCustodianId(me);
    } else if (me.user_group === UserGroup.ORGANISATIONS) {
      organisationId = me.organisation_id;
    }
  }

  return (
    <Application
      custodianId={custodianId}
      organisationId={organisationId}
      me={me}>
      <PageContainer>{children}</PageContainer>
    </Application>
  );
}
