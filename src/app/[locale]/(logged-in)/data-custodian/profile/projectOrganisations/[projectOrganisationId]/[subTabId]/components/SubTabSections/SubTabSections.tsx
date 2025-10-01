"use client";

import { useStore } from "@/data/store";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import { injectParamsIntoPath } from "@/utils/application";
import { useTranslations } from "next-intl";
import { OrganisationsSubTabs } from "../../../../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export interface SubTabsMap {
  [key: string]: Option[];
}

interface SubTabsSectionsProps {
  subTabId: OrganisationsSubTabs;
  projectOrganisationId?: number;
}

export default function SubTabsSections({
  subTabId,
  projectOrganisationId,
}: SubTabsSectionsProps) {
  const routes = useStore(store => store.getApplication().routes);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const subTabs = [
    {
      label: t("organisationsPeople"),
      value: OrganisationsSubTabs.PEOPLE,
      href: injectParamsIntoPath(
        routes.profileCustodianOrganisationsPeople.path,
        {
          projectOrganisationId,
        }
      ),
    },
    {
      label: t("organisationsNameAddress"),
      value: OrganisationsSubTabs.NAME_ADDRESS,
      href: injectParamsIntoPath(
        routes.profileCustodianOrganisationsNameAddress.path,
        {
          projectOrganisationId,
        }
      ),
    },
    {
      label: t("organisationsDigitalIdentifiers"),
      value: OrganisationsSubTabs.DIGITAL_IDENTIFIERS,
      href: injectParamsIntoPath(
        routes.profileCustodianOrganisationsDigitalIdentifiers.path,
        {
          projectOrganisationId,
        }
      ),
    },
    {
      label: t("organisationsSectorWebsite"),
      value: OrganisationsSubTabs.SECTOR_WEBSITE,
      href: injectParamsIntoPath(
        routes.profileCustodianOrganisationsSectorWebsite.path,
        {
          projectOrganisationId,
        }
      ),
    },
    {
      label: t("organisationsDataSecurity"),
      value: OrganisationsSubTabs.DATA_SECURITY_COMPLIANCE,
      href: injectParamsIntoPath(
        routes.profileCustodianOrganisationsDataSecurityCompliance.path,
        {
          projectOrganisationId,
        }
      ),
    },
    {
      label: t("organisationsAutomatedFlags"),
      value: OrganisationsSubTabs.AUTOMATED_FLAGS,
      href: injectParamsIntoPath(
        routes.profileCustodianOrganisationsAutomatedFlags.path,
        {
          projectOrganisationId,
        }
      ),
    },
  ];

  return <SubTabs current={subTabId} tabs={subTabs} />;
}
