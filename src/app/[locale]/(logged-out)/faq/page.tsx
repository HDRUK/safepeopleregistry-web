import { Metadata } from "next";
import { PageContainer } from "@/modules";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import FAQContent from "@/app/[locale]/(logged-out)/faq/components/FAQContent";

export const metadata: Metadata = {
  title: "FAQs | Safe People Registry",
  description:
    "Frequently asked questions about the Safe People Registry — covering researcher registration, identity verification, and data access governance.",
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
