import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { Footer, Header } from "@/modules";
import TermsAndConditions from "./components/TermsAndConditions";

export const metadata: Metadata = {
  title: `Terms and Conditions | ${SITE_NAME}`,
  description:
    "Read the terms and conditions governing use of the Safe People Registry platform.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <TermsAndConditions />
      </main>
      <Footer />
    </>
  );
}
