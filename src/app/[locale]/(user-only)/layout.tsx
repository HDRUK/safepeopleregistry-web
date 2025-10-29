import { PageContainer } from "@/modules";
import ApplicationUser from "@/organisms/ApplicationUser";
import { redirectProfile } from "@/utils/headers";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await redirectProfile();

  return (
    <ApplicationUser>
      <PageContainer>{children}</PageContainer>
    </ApplicationUser>
  );
}
