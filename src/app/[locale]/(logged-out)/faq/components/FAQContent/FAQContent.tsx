"use server";

import ExternalLink from "@/components/ExternalLink";
import links from "@/consts/links";
import { PageBodyContainer } from "@/modules";
import { Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import { FAQSection, FAQSectionConfig } from "@/types/faq";
import FAQAccordion from "../FAQAccordion";

const NAMESPACE_TRANSLATIONS = "FAQ";

const SECTIONS: FAQSectionConfig[] = [
  {
    id: "general",
    labelKey: "general-section-text",
    questions: [
      "howKeepPersonalInfoSecure",
      "orgValidationSafeSetting",
      "healthDataResearchOnly",
      "orgAddedRegistry",
      "validationApprovalAffiliationDiff",
      "whoUploadsProjectInfo",
      "validationGrantAccess",
      "projectApprovedUserValidated",
      "learnMoreSafePeople",
    ],
  },
  {
    id: "users",
    labelKey: "users-section-text",
    questions: ["multiOrganisation", "personalEmailLogin", "userSaveTime"],
  },
  {
    id: "organisations",
    labelKey: "organisations-section-text",
    questions: [
      "linkHRSystems",
      "sroRole",
      "sroDelegate",
      "orgSeeProjectsBeforeApproval",
      "orgVerified",
    ],
  },
  {
    id: "custodians",
    labelKey: "custodians-section-text",
    questions: [
      "registryMakeDecisions",
      "automatedFlagsManualChecks",
      "registryDataAccessApps",
      "usersAddedProjects",
      "auditLogsManaged",
      "delegateProjectTasks",
      "fillFiveSafes",
      "custodianSaveTime",
      "registryStopSupported",
    ],
  },
];

export default async function FAQContent() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  const richRenderers = {
    bold: (chunks: ReactNode) => <strong>{chunks}</strong>,
    explainerVideo: (chunks: ReactNode) => (
      <ExternalLink href={links.faq.explainerVideo}>{chunks}</ExternalLink>
    ),
    hdrLink: (chunks: ReactNode) => (
      <ExternalLink href={links.faq.hdr}>{chunks}</ExternalLink>
    ),
    dataTransparency: (chunks: ReactNode) => (
      <ExternalLink href={links.faq.dataTransparency}>{chunks}</ExternalLink>
    ),
  };

  const renderRichText = t.rich as (
    key: string,
    values: typeof richRenderers
  ) => ReactNode;

  const resolveAnswer = (questionKey: string) => {
    const answerKey = `${questionKey}A`;
    const raw = t.raw(answerKey);

    return Array.isArray(raw)
      ? (raw as string[]).map((_, i) =>
          renderRichText(`${answerKey}.${i}`, richRenderers)
        )
      : [renderRichText(answerKey, richRenderers)];
  };

  const sections: FAQSection[] = SECTIONS.map(
    ({ id, labelKey, questions }) => ({
      id,
      label: t(labelKey),
      questions: questions.map(questionKey => ({
        id: `${id}-${questionKey}`,
        question: t(`${questionKey}Q`),
        answer: resolveAnswer(questionKey),
      })),
    })
  );

  return (
    <PageBodyContainer heading={t("infoTitle")} component="article">
      <Typography sx={{ mt: 2 }}>{t("mission")}</Typography>

      <FAQAccordion
        sectionSelectorTitle={t("sectionSelectorTitle")}
        sections={sections}
      />
    </PageBodyContainer>
  );
}
