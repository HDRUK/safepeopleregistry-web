"use client";

import { useStore } from "@/data/store";
import { useFeatures } from "@/components/FeatureProvider";
import { useTranslations } from "next-intl";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import { injectParamsIntoPath } from "@/utils/application";
import {
  PageTabs,
  ProjectsSubTabs,
  DetailsPageSubTabs,
  UserAdminPageSubTabs,
} from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export interface SubTabsMap {
  [key: string]: Option[];
}

interface SubTabsSectionsProps {
  tabId: PageTabs;
  subTabId: DetailsPageSubTabs | ProjectsSubTabs | UserAdminPageSubTabs;
  id?: number;
}

export default function SubTabsSections({
  tabId,
  subTabId,
  id,
}: SubTabsSectionsProps) {
  const routes = useStore(store => store.application.routes);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { isEnterpriseSamlSsoEnabled } = useFeatures();

  const subTabs: SubTabsMap = {
    [PageTabs.DETAILS]: [
      {
        label: "Name & Senior Responsible Officer",
        value: DetailsPageSubTabs.NAME_AND_SRO,
        href: injectParamsIntoPath(
          routes.profileOrganisationDetailsNameAndSRO.path,
          {
            id,
          }
        ),
      },
      {
        label: "Address",
        value: DetailsPageSubTabs.ADDRESS,
        href: injectParamsIntoPath(
          routes.profileOrganisationDetailsAddress.path,
          {
            id,
          }
        ),
      },
      {
        label: "Organisation details",
        value: DetailsPageSubTabs.ORGANISATION_DETAILS,
        href: injectParamsIntoPath(
          routes.profileOrganisationDetailsOrganisationDetails.path,
          {
            id,
          }
        ),
      },
      {
        label: t("detailsDigitalIdentifiers"),
        value: DetailsPageSubTabs.DIGITAL_IDENTIFIERS,
        href: injectParamsIntoPath(
          routes.profileOrganisationDetailsDigitalIdentifiers.path,
          {
            id,
          }
        ),
      },
      {
        label: t("detailsSecurityCompliance"),
        value: DetailsPageSubTabs.SECURITY_COMPLIANCE,
        href: injectParamsIntoPath(
          routes.profileOrganisationDetailsSecurityCompliance.path,
          {
            id,
          }
        ),
      },
      ...(isEnterpriseSamlSsoEnabled
        ? [
            {
              label: t("detailsSso"),
              value: DetailsPageSubTabs.SSO,
              href: injectParamsIntoPath(
                routes.profileOrganisationDetailsSso.path,
                { id }
              ),
            },
          ]
        : []),
    ],
    [PageTabs.PROJECTS]: [
      {
        label: t("safeProject"),
        value: ProjectsSubTabs.SAFE_PROJECT,
        href: injectParamsIntoPath(
          routes.profileOrganisationProjectsSafeProject.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safeData"),
        value: ProjectsSubTabs.SAFE_DATA,
        href: injectParamsIntoPath(
          routes.profileOrganisationProjectsSafeData.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safePeople"),
        value: ProjectsSubTabs.SAFE_PEOPLE,
        href: injectParamsIntoPath(
          routes.profileOrganisationProjectsSafePeople.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safeSettings"),
        value: ProjectsSubTabs.SAFE_SETTINGS,
        href: injectParamsIntoPath(
          routes.profileOrganisationProjectsSafeSettings.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safeOutputs"),
        value: ProjectsSubTabs.SAFE_OUTPUTS,
        href: injectParamsIntoPath(
          routes.profileOrganisationProjectsSafeOutputs.path,
          {
            id,
          }
        ),
      },
    ],
  };

  const selectedTabs = subTabs[tabId];

  if (!selectedTabs || !tabId) {
    return null;
  }

  return <SubTabs current={subTabId} tabs={selectedTabs} />;
}
