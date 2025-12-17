import { Footer, Header } from "@/modules";
import PrivaryPolicy from "./components/PrivacyPolicy";

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
