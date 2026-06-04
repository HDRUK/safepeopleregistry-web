import { Metadata } from "next";
import { PageContainer } from "@/modules";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import GetInvolvedContent from "./components/GetInvolvedContent";

export const metadata: Metadata = {
  title: "Get Involved | Safe People Registry",
  description: "Join the Safe People Registry community",
};

export default function Page() {
  return (
    <PageContainer>
      <InfoPageWrapper>
        <GetInvolvedContent />
      </InfoPageWrapper>
    </PageContainer>
  );
}
