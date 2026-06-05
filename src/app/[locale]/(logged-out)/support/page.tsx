import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { Footer, Header } from "@/modules";
import SupportContent from "./components/SupportContent";

export const metadata: Metadata = {
  title: `Support | ${SITE_NAME}`,
  description:
    "Find help and support resources for using Safe People Registry, including guidance for researchers, organisations, and data custodians.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <SupportContent />
      </main>
      <Footer />
    </>
  );
}
