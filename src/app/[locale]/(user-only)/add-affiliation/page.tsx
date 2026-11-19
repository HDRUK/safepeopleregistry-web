import type { Metadata } from "next";
import { PageBody } from "@/modules";
import { SITE_NAME } from "@/utils/metadata";
import { redirectProfile } from "@/utils/router";
import AddAffiliation from "./components/AddAffiliation";

export const metadata: Metadata = {
  title: `Add your affiliation | ${SITE_NAME}`,
};

export default async function Page() {
  // Sends logged-out visitors to the homepage, and anyone already fully signed up
  // to their profile, so only researchers who still need an affiliation see this page.
  await redirectProfile();

  return (
    <PageBody>
      <AddAffiliation />
    </PageBody>
  );
}
