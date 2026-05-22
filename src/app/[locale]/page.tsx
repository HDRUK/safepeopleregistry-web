import { Footer, Header } from "@/modules";
import redirectApplication from "@/utils/router";
import SoursdInfo from "./components/SoursdInfo";
import Support from "@/app/[locale]/components/Support";
import SoursdUsages from "@/app/[locale]/components/SoursdUsages";

export default async function Page() {
  await redirectApplication();

  return (
    <>
      <Header />
      <main>
        <SoursdInfo />
        <Support />
        <SoursdUsages />
      </main>
      <Footer />
    </>
  );
}
