import { Footer, Header } from "@/modules";
import CookiePolicy from "./components/Glossary";

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
