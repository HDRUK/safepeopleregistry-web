import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { Footer, Header } from "@/modules";
import CookiePolicy from "./components/CookiePolicy";

export const metadata: Metadata = {
  title: `Cookie Policy | ${SITE_NAME}`,
  description:
    "Learn how Safe People Registry uses cookies and similar technologies on our website.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <CookiePolicy />
      </main>
      <Footer />
    </>
  );
}
