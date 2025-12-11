import { Footer, Header } from "@/modules";
import AboutContent from "./components/AboutContent";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
