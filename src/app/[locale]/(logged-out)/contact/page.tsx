import { Metadata } from "next";
import { PageContainer } from "@/modules";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import ContactContent from "./components/ContactContent";

export const metadata: Metadata = {
  title: "Contact us | Safe People Registry",
  description: "Get in touch with the Safe People Registry team.",
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
