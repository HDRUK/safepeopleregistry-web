import { Metadata } from "next";
import { PageContainer } from "@/modules";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import AboutContent from "./components/AboutContent";
import KeyReferences from "./components/KeyReferences";

export const metadata: Metadata = {
  title: "About | Safe People Registry",
  description:
    "Learn about the Safe People Registry and how it supports researcher identity verification and data access governance.",
};

export default function Page() {
  return (
    <PageContainer>
      <InfoPageWrapper>
        <AboutContent />
        <KeyReferences />
      </InfoPageWrapper>
    </PageContainer>
  );
}
