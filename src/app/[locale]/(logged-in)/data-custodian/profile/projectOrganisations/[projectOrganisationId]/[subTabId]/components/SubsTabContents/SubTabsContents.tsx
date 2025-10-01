"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import OrganisationsPeople from "../../../../../components/OrganisationsPeople";
import OrganisationsNameAddress from "../../../../../components/OrganisationsNameAddress";
import OrganisationsDigitalIdentifiers from "../../../../../components/OrganisationsDigitalIdentifiers";
import OrganisationsSectorWebsite from "../../../../../components/OrganisationsSectorWebsite";
import OrganisationsDataSecurityCompliance from "../../../../../components/OrganisationsDataSecurityCompliance";

import { OrganisationsSubTabs } from "../../../../../consts/tabs";
import OrganisationsAutomatedFlags from "../../../../../components/OrganisationsAutomatedFlags";

interface TabsContentsProps {
  subTabId: OrganisationsSubTabs;
}

export default function SubTabsContents({ subTabId }: TabsContentsProps) {
  const custodian = useStore(state => [state.getCustodian()]);

  const availableSubTabs = Object.values(OrganisationsSubTabs) || [];

  if (!custodian || !availableSubTabs.includes(subTabId)) {
    notFound();
  }

  let content = null;

  switch (subTabId) {
    case OrganisationsSubTabs.PEOPLE:
      content = <OrganisationsPeople />;
      break;
    case OrganisationsSubTabs.NAME_ADDRESS:
      content = <OrganisationsNameAddress />;
      break;
    case OrganisationsSubTabs.DIGITAL_IDENTIFIERS:
      content = <OrganisationsDigitalIdentifiers />;
      break;
    case OrganisationsSubTabs.SECTOR_WEBSITE:
      content = <OrganisationsSectorWebsite />;
      break;
    case OrganisationsSubTabs.DATA_SECURITY_COMPLIANCE:
      content = <OrganisationsDataSecurityCompliance />;
      break;
    case OrganisationsSubTabs.AUTOMATED_FLAGS:
      content = <OrganisationsAutomatedFlags />;
      break;
    default:
      content = null;
  }

  return content;
}
