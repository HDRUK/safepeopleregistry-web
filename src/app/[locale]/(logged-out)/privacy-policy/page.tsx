import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { Footer, Header } from "@/modules";
import PrivaryPolicy from "./components/PrivacyPolicy";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description:
    "Read our privacy policy to understand how Safe People Registry collects, uses, and protects your personal data.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <PrivaryPolicy />
      </main>
      <Footer />
    </>
  );
}
