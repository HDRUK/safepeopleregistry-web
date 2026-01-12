"use client";

import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import useColumns from "@/hooks/useColumns";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { PageSection, UsersTable } from "@/modules";
import InvitesFilters from "@/modules/InvitesFilters";
import {
  postResendInviteQuery,
  usePaginatedPendingInvitesQuery,
} from "@/services/users";
import { PendingInvite } from "@/types/application";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "Admin.InvitesFilters";

export default function InvitesList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const { createDefaultColumn } = useColumns<PendingInvite>({ t });

  const { refetch, ...queryState } = usePaginatedPendingInvitesQuery();

  const { mutateAsync, ...mutationState } = useMutation(
    postResendInviteQuery()
  );

  const handleResendInvite = async (id: number) => {
    await mutateAsync(id);
  };

  useQueryAlerts(mutationState, {
    onSuccess: () => {
      refetch();
    },
  });

  const extraColumns = [
    createDefaultColumn("actions", {
      header: "",
      cell: info => {
        const { id, user } = info.row.original;

        return (
          <ActionMenu>
            <ActionMenuItem
              disabled={!user?.unclaimed}
              onClick={() => handleResendInvite(id)}>
              Resend invite
            </ActionMenuItem>
          </ActionMenu>
        );
      },
    }),
  ];

  return (
    <>
      <PageSection>
        <InvitesFilters {...queryState} />
      </PageSection>
      <PageSection>
        <UsersTable extraColumns={extraColumns} {...queryState} t={t} />
      </PageSection>
    </>
  );
}
