import type { Metadata } from "next";
import { PageBody } from "@/modules";
import { SITE_NAME } from "@/utils/metadata";
import { redirectProfile } from "@/utils/router";
import NoOrganisation from "./components/NoOrganisation";

export const metadata: Metadata = {
  title: `No organisation | ${SITE_NAME}`,
};

export default async function Page() {
  // Sends logged-out visitors to the homepage, and anyone who still has an
  // organisation to their profile, so only users without one see this page.
  await redirectProfile();

  return (
    <PageBody>
      <NoOrganisation />
    </PageBody>
  );
}
