import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { PageContainer } from "@/modules";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import DeveloperResourcesContent from "./components/DeveloperResourcesContent";

export const metadata: Metadata = {
  title: `Developer Resources | ${SITE_NAME}`,
  description:
    "API documentation and SDKs for integrating with the Safe People Registry.",
};

export default function Page() {
  return (
    <PageContainer>
      <InfoPageWrapper>
        <DeveloperResourcesContent />
      </InfoPageWrapper>
    </PageContainer>
  );
}
