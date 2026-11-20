import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function DigitalIdentifiersLayout({ children }: PropsWithChildren) {
  return (
    <Layout params={{ tabId: PageTabs.DIGITAL_IDENTIFIERS }}>{children}</Layout>
  );
}

export default DigitalIdentifiersLayout;
