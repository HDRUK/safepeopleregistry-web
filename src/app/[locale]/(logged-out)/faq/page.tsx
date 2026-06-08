import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { PageContainer } from "@/modules";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import FAQContent from "@/app/[locale]/(logged-out)/faq/components/FAQContent";

export const metadata: Metadata = {
  title: `FAQs | ${SITE_NAME}`,
  description:
    "Frequently asked questions about the Safe People Registry — covering researchers & innovators (the data users), their organisations, and the data custodians making decisions on 'safe people' access.",
};

export default function Page() {
  return (
    <PageContainer>
      <InfoPageWrapper>
        <FAQContent />
      </InfoPageWrapper>
    </PageContainer>
  );
}
