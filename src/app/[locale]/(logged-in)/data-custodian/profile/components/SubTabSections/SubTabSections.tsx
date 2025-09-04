"use client";

import { useStore } from "@/data/store";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import { injectParamsIntoPath } from "@/utils/application";
import { useTranslations } from "next-intl";
import {
  ConfigurationSubTabs,
  OrganisationsSubTabs,
  PageTabs,
  ProjectsSubTabs,
  UserSubTabs,
} from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export interface SubTabsMap {
  [key: string]: Option[];
}

interface SubTabsSectionsProps {
  tabId: PageTabs;
  subTabId:
    | ConfigurationSubTabs
    | UserSubTabs
    | ProjectsSubTabs
    | OrganisationsSubTabs;
  id?: number;
}

export default function SubTabsSections({
  tabId,
  subTabId,
  id,
}: SubTabsSectionsProps) {
  const routes = useStore(store => store.getApplication().routes);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const subTabs: SubTabsMap = {
    [PageTabs.CONFIGURATION]: [
      {
        label: t("configurationRules"),
        value: ConfigurationSubTabs.RULES,
        href: routes.profileCustodianConfigurationRules.path,
      },
      {
        label: t("configurationValidationChecks"),
        value: ConfigurationSubTabs.VALIDATION_CHECKS,
        href: routes.profileCustodianConfigurationValidationChecks.path,
      },
      {
        label: t("configurationWebhooks"),
        value: ConfigurationSubTabs.WEBHOOKS,
        href: routes.profileCustodianConfigurationWebhooks.path,
      },
      {
        label: t("configurationIntegrations"),
        value: ConfigurationSubTabs.INTEGRATIONS,
        href: routes.profileCustodianConfigurationIntegrations.path,
      },
    ],
    [PageTabs.USERS]: [
      {
        label: t("affiliations"),
        value: UserSubTabs.AFFILIATIONS,
        href: injectParamsIntoPath(
          routes.profileCustodianUsersAffiliations.path,
          {
            id,
          }
        ),
      },
      {
        label: t("projects"),
        value: UserSubTabs.PROJECTS,
        href: injectParamsIntoPath(routes.profileCustodianUsersProjects.path, {
          id,
        }),
      },
      {
        label: t("identity"),
        value: UserSubTabs.IDENTITY,
        href: injectParamsIntoPath(routes.profileCustodianUsersIdentity.path, {
          id,
        }),
      },
      {
        label: t("trainingAccreditations"),
        value: UserSubTabs.TRAINING_ACCREDITATIONS,
        href: injectParamsIntoPath(
          routes.profileCustodianUsersTrainingAccreditations.path,
          {
            id,
          }
        ),
      },
      {
        label: t("custodianOrgInfo"),
        value: UserSubTabs.CUSTODIAN_ORG_INFO,
        href: injectParamsIntoPath(
          routes.profileCustodianUsersCustodianOrgInfo.path,
          {
            id,
          }
        ),
      },
      {
        label: t("history"),
        value: UserSubTabs.HISTORY,
        href: injectParamsIntoPath(routes.profileCustodianUsersHistory.path, {
          id,
        }),
      },
    ],
    [PageTabs.PROJECTS]: [
      {
        label: t("safeProject"),
        value: ProjectsSubTabs.SAFE_PROJECT,
        href: injectParamsIntoPath(
          routes.profileCustodianProjectsSafeProject.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safeData"),
        value: ProjectsSubTabs.SAFE_DATA,
        href: injectParamsIntoPath(
          routes.profileCustodianProjectsSafeData.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safePeople"),
        value: ProjectsSubTabs.SAFE_PEOPLE,
        href: injectParamsIntoPath(
          routes.profileCustodianProjectsSafePeople.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safeSettings"),
        value: ProjectsSubTabs.SAFE_SETTINGS,
        href: injectParamsIntoPath(
          routes.profileCustodianProjectsSafeSettings.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safeOutputs"),
        value: ProjectsSubTabs.SAFE_OUTPUTS,
        href: injectParamsIntoPath(
          routes.profileCustodianProjectsSafeOutputs.path,
          {
            id,
          }
        ),
      },
    ],
    [PageTabs.ORGANISATIONS]: [
      {
        label: t("organisationsPeople"),
        value: OrganisationsSubTabs.PEOPLE,
        href: injectParamsIntoPath(
          routes.profileCustodianOrganisationsPeople.path,
          {
            id,
          }
        ),
      },
      {
        label: t("organisationsNameAddress"),
        value: OrganisationsSubTabs.NAME_ADDRESS,
        href: injectParamsIntoPath(
          routes.profileCustodianOrganisationsNameAddress.path,
          {
            id,
          }
        ),
      },
      {
        label: t("organisationsDigitalIdentifiers"),
        value: OrganisationsSubTabs.DIGITAL_IDENTIFIERS,
        href: injectParamsIntoPath(
          routes.profileCustodianOrganisationsDigitalIdentifiers.path,
          {
            id,
          }
        ),
      },
      {
        label: t("organisationsSectorWebsite"),
        value: OrganisationsSubTabs.SECTOR_WEBSITE,
        href: injectParamsIntoPath(
          routes.profileCustodianOrganisationsSectorWebsite.path,
          {
            id,
          }
        ),
      },
      {
        label: t("organisationsDataSecurity"),
        value: OrganisationsSubTabs.DATA_SECURITY_COMPLIANCE,
        href: injectParamsIntoPath(
          routes.profileCustodianOrganisationsDataSecurityCompliance.path,
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
