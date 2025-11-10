"use client";

import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import useColumns from "@/hooks/useColumns";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { UsersTable } from "@/modules";
import { usePaginatedUsersQuery } from "@/services/users";
import postResendInviteQuery from "@/services/users/postResendInviteQuery";
import { User } from "@/types/application";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "UsersList";

export default function UsersList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const { createDefaultColumn } = useColumns<User>({ t });

  const { refetch, ...queryState } = usePaginatedUsersQuery();

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
        const { unclaimed } = info.row.original;

        return (
          <ActionMenu>
            <ActionMenuItem disabled={!unclaimed} onClick={handleResendInvite}>
              Resend invite
            </ActionMenuItem>
          </ActionMenu>
        );
      },
    }),
  ];

  return <UsersTable extraColumns={extraColumns} {...queryState} t={t} />;
}
