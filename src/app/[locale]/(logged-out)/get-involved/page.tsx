import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { PageContainer } from "@/modules";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import GetInvolvedContent from "./components/GetInvolvedContent";

export const metadata: Metadata = {
  title: `Get Involved | ${SITE_NAME}`,
  description:
    "Join the Safe People Registry community and help shape the future of this software. Let your voice be heard.",
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
