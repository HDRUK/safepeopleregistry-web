import useProfileRedirect from "@/hooks/useProfileRedirect";
import { PageContainer } from "@/modules";
import ApplicationUser from "@/organisms/ApplicationUser";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await useProfileRedirect();

  return (
    <ApplicationUser>
      <PageContainer>{children}</PageContainer>
    </ApplicationUser>
  );
}
