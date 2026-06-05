import { Metadata } from "next";
import { MoreQuestions, PageContainer } from "@/modules";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import AboutContent from "./components/AboutContent";
import OpenAccess from "./components/OpenAccess";
import KeyReferences from "./components/KeyReferences";
import AuthButtons from "@/organisms/AuthButtons";

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
        <OpenAccess />
        <AuthButtons />
        <MoreQuestions />
        <KeyReferences />
      </InfoPageWrapper>
    </PageContainer>
  );
}
