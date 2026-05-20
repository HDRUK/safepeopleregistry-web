import { PageContainer } from "@/modules";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import AboutContent from "./components/AboutContent";
import AuthButtons from "@/organisms/AuthButtons";
import KeyReferences from "./components/KeyReferences";

export default function Page() {
  return (
    <PageContainer>
      <InfoPageWrapper>
        <AboutContent />
        <AuthButtons />
        <KeyReferences />
      </InfoPageWrapper>
    </PageContainer>
  );
}
