import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { MoreQuestions, PageContainer } from "@/modules";
import Personas from "@/app/[locale]/(logged-out)/how-it-works/components/Personas";
import ProductVideo from "@/app/[locale]/(logged-out)/how-it-works/components/ProductVideo";
import About from "@/app/[locale]/(logged-out)/how-it-works/components/About";
import InfoHero from "@/components/InfoHero";
import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";

export const metadata: Metadata = {
  title: `How It Works | ${SITE_NAME}`,
  description:
    "Learn how Safe People Registry connects researchers, their organisations, and data custodians to enable safe, governed access to sensitive research data.",
};

export default function Page() {
  return (
    <PageContainer>
      <InfoPageWrapper>
        <About />
        <Personas />
        <ProductVideo />
        <InfoHero translationPath="HowItWorks.InfoHero" />
        <MoreQuestions />
      </InfoPageWrapper>
    </PageContainer>
  );
}
