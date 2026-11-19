"use client";

import { useFeatures } from "@/components/FeatureProvider";
import Guidance from "@/components/Guidance";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import { mockedLinkedIdentitiesGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import LinkedIdentities from "../Identity/LinkedIdentities";

const NAMESPACE_TRANSLATION = "Users.Identity";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function DigitalIdentifiers() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { isLinkedIdentitiesEnabled } = useFeatures();

  if (!isLinkedIdentitiesEnabled) {
    notFound();
  }

  return (
    <PageBodyContainer heading={t("digitalIdentifiersTitle")}>
      <PageColumns>
        <PageColumnBody size={{ lg: 8 }}>
          <PageBody>
            <LinkedIdentities />
            <ProfileNavigationFooter
              previousHref={ROUTES.profileResearcherIdentity.path}
              nextHref={ROUTES.profileResearcherExperience.path}
              nextStepText={tProfile("experience")}
            />
          </PageBody>
        </PageColumnBody>
        <PageColumnDetails size={{ lg: 4 }}>
          <Guidance
            {...mockedLinkedIdentitiesGuidanceProps}
            isCollapsible={false}
            infoWidth="100%"
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}
