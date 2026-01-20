import { Footer, Header } from "@/modules";
import redirectApplication from "@/utils/router";
import KeyFeatures from "./components/KeyFeatures";
import SoursdInfo from "./components/SoursdInfo";
import SoursdUsages from "./components/SoursdUsages";
import Support from "./components/Support";

export default async function Page() {
  await redirectApplication();

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
