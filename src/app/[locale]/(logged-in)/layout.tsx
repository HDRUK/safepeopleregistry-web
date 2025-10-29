import { UserGroup } from "@/consts/user";
import { PageContainer } from "@/modules";
import Application from "@/organisms/Application";
import { getMe } from "@/services/auth";
import { getCustodianUser } from "@/services/custodian_users";
import { User } from "@/types/application";
import { redirectApplication } from "@/utils/headers";
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

  await redirectApplication();

  const { data } = await getMe();

  if (data) {
    if (data.user_group === UserGroup.CUSTODIANS) {
      custodianId = await getCustodianId(data);
    } else if (data.user_group === UserGroup.ORGANISATIONS) {
      organisationId = data.organisation_id;
    }
  }

  return (
    <Application
      custodianId={custodianId}
      organisationId={organisationId}
      me={data}>
      <PageContainer>{children}</PageContainer>
    </Application>
  );
}
