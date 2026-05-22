import { PageContainer } from "@/modules";
import Personas from "@/app/[locale]/(logged-out)/how-it-works/components/Personas";
import ProductVideo from "@/app/[locale]/(logged-out)/how-it-works/components/ProductVideo";
import About from "@/app/[locale]/(logged-out)/how-it-works/components/About";
import InfoHero from "@/components/InfoHero";

export default function Page() {
  return (
    <PageContainer>
      <About />
      <Personas />
      <ProductVideo />
      <InfoHero translationPath="HowItWorks.InfoHero" />
    </PageContainer>
  );
}
