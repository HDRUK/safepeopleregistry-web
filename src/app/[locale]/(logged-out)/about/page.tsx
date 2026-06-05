import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { MoreQuestions, PageContainer } from "@/modules";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import AboutContent from "./components/AboutContent";
import OpenAccess from "./components/OpenAccess";
import KeyReferences from "./components/KeyReferences";
import AuthButtons from "@/organisms/AuthButtons";

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description:
    "Learn about how Safe People Registry came about, and the communities involved in its creation.",
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
