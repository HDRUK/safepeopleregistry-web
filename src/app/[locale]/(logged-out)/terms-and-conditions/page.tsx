import { Footer, Header } from "@/modules";
import TermsAndConditions from "./components/TermsAndConditions";

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
