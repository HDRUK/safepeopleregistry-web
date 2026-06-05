import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

export const metadata: Metadata = {
  title: `Contacts | ${SITE_NAME}`,
  description: "Manage your data custodian team on Safe People Registry.",
};

function ContactsPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.CONTACTS,
      }}
    />
  );
}

export default ContactsPage;
