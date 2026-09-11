"use client";

import { PageSection, SuperAdminTable } from "@/modules";
import { usePaginatedUsersQuery } from "@/services/users";
import { UserGroup } from "@/consts/user";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "Admin.SuperAdminList";

export default function SuperAdminList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  const queryState = usePaginatedUsersQuery({
    defaultQueryParams: { "user_group__and[]": UserGroup.ADMINS },
  });

  return (
    <PageSection>
      <SuperAdminTable {...queryState} t={t} />
    </PageSection>
  );
}
