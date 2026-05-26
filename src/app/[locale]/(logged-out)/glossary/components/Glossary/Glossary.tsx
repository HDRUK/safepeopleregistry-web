import InfoPageWrapper from "@/app/[locale]/(logged-out)/components/InfoPageWrapper";
import { PageBodyContainer, PageColumnBody, PageColumns } from "@/modules";
import { getTranslations } from "next-intl/server";

import GlossaryNavigation from "./GlossaryNavigation";
import GlossaryTerms from "./GlossaryTerms";
import Link from "next/link";

const NAMESPACE_TRANSLATIONS = "Glossary";

export default async function Glossary() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  const glossaryTerms = [
    {
      letter: "A",
      terms: [
        {
          term: t("letterA.administrator.term"),
          definition: t("letterA.administrator.definition"),
        },
        {
          term: t("letterA.affliation.term"),
          definition: t("letterA.affliation.definition"),
        },
        {
          term: t("letterA.approval.term"),
          definition: t("letterA.approval.definition"),
        },
        {
          term: t("letterA.approver.term"),
          definition: t("letterA.approver.definition"),
        },
      ],
    },
    {
      letter: "D",
      terms: [
        {
          term: t("letterD.dataCustodian.term"),
          definition: t("letterD.dataCustodian.definition"),
        },
        {
          term: t("letterD.delegates.term"),
          definition: t("letterD.delegates.definition"),
        },
      ],
    },
    {
      letter: "O",
      terms: [
        {
          term: t("letterO.organisation.term"),
          definition: t("letterO.organisation.definition"),
        },
      ],
    },
    {
      letter: "S",
      terms: [
        {
          term: t("letterS.safeHaven.term"),
          definition: t.rich("letterS.safeHaven.definition", {
            safeHavenLink: chunks => (
              <Link
                href="https://www.safehavens.org.uk"
                target="_blank"
                rel="noopener noreferrer">
                {chunks}
              </Link>
            ),
          }),
        },
        {
          term: t("letterS.secureDataEnvironment.term"),
          definition: t.rich("letterS.secureDataEnvironment.definition", {
            nhsLink: chunks => (
              <Link
                href="https://digital.nhs.uk/services/secure-data-environment-service"
                target="_blank"
                rel="noopener noreferrer">
                {chunks}
              </Link>
            ),
          }),
        },
        {
          term: t("letterS.seniorResponsibleOfficer.term"),
          definition: t("letterS.seniorResponsibleOfficer.definition"),
        },
        {
          term: t("letterS.sponsorship.term"),
          definition: t("letterS.sponsorship.definition"),
        },
      ],
    },
    {
      letter: "T",
      terms: [
        {
          term: t("letterT.trustedResearchEnvironment.term"),
          definition: t("letterT.trustedResearchEnvironment.definition"),
        },
      ],
    },
    {
      letter: "U",
      terms: [
        {
          term: t("letterU.user.term"),
          definition: t("letterU.user.definition"),
        },
      ],
    },
    {
      letter: "V",
      terms: [
        {
          term: t("letterV.validatedUser.term"),
          definition: t("letterV.validatedUser.definition"),
        },
        {
          term: t("letterV.validation.term"),
          definition: t("letterV.validation.definition"),
        },
      ],
    },
  ];

  return (
    <InfoPageWrapper>
      <PageBodyContainer heading={t("title")}>
        <PageColumns>
          <PageColumnBody size={{ lg: 8 }}>
            <GlossaryNavigation glossaryTerms={glossaryTerms} />
          </PageColumnBody>
          <PageColumnBody size={{ lg: 8 }}>
            <GlossaryTerms glossaryTerms={glossaryTerms} />
          </PageColumnBody>
        </PageColumns>
      </PageBodyContainer>
    </InfoPageWrapper>
  );
}
