import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { Footer, Header } from "@/modules";
import FeaturesContent from "./components/FeaturesContent";

export const metadata: Metadata = {
  title: `Features | ${SITE_NAME}`,
  description:
    "Discover how Safe People Registry streamlines researcher identity verification, affiliation management, and data access governance for organisations and custodians.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <FeaturesContent />
      </main>
      <Footer />
    </>
  );
}
