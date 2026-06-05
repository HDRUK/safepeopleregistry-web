import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { PageContainer } from "@/modules";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import ContactContent from "./components/ContactContent";

export const metadata: Metadata = {
  title: `Contact us | ${SITE_NAME}`,
  description: "Get in touch with the Safe People Registry team",
};

export default function Page() {
  return (
    <PageContainer>
      <InfoPageWrapper>
        <ContactContent />
      </InfoPageWrapper>
    </PageContainer>
  );
}
