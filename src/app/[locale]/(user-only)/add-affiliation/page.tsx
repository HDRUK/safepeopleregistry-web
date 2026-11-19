import type { Metadata } from "next";
import { putVerifyEmail } from "@/app/actions/affiliations";
import AddAffiliation from "@/app/[locale]/(user-only)/add-affiliation/components/AddAffiliation";
import { PageBody } from "@/modules";
import { isVerificationCode } from "@/utils/affiliations";
import { SITE_NAME } from "@/utils/metadata";
import { responseToQueryState } from "@/utils/query";
import { redirectProfile } from "@/utils/router";

export const metadata: Metadata = {
  title: `Add your affiliation | ${SITE_NAME}`,
};

interface PageProps {
  searchParams?: Promise<{
    verify?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const verify = (await searchParams)?.verify;

  const verifyQueryState = isVerificationCode(verify)
    ? responseToQueryState(
        await putVerifyEmail(verify, { suppressThrow: true })
      )
    : undefined;

  // Sends logged-out visitors to the homepage, and anyone already fully signed up
  // to their profile, so only researchers who still need an affiliation see this page.
  await redirectProfile();

  return (
    <PageBody>
      <AddAffiliation verifyQueryState={verifyQueryState} />
    </PageBody>
  );
}
