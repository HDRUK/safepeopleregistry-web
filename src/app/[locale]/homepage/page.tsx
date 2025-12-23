import { Footer, Header } from "@/modules";
import KeyFeatures from "./components/KeyFeatures";
import SoursdInfo from "./components/SoursdInfo";
import SoursdUsages from "./components/SoursdUsages";
import Support from "./components/Support";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <section>
          <SoursdInfo />
        </section>
        <section>
          <SoursdUsages />
        </section>
        <section>
          <KeyFeatures />
        </section>
        <section>
          <Support />
        </section>
      </main>
      <Footer />
    </>
  );
}
