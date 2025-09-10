"use client";

import { OrganisationsTable } from "@/modules";
import { useOrganisationsQuery } from "@/services/organisations";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_ORGANISATIONS = "OrganisationsList";

export default function OrganisationsList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATIONS);

  const query = useOrganisationsQuery();

  return <OrganisationsTable {...query} t={t} />;
}
