"use client";

import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import useColumns from "@/hooks/useColumns";
import { OrganisationsTable } from "@/modules";
import {
  Organisation,
  putOrganisationApprovedQuery,
  useOrganisationsQuery,
} from "@/services/organisations";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_ORGANISATIONS = "OrganisationsList";

export default function OrganisationsList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATIONS);
  const { createDefaultColumn } = useColumns<Organisation>({ t });

  const { refetch, ...query } = useOrganisationsQuery();

  const { mutateAsync } = useMutation(putOrganisationApprovedQuery());

  const handleApprove = async (
    organisationId: number,
    systemApproved: boolean
  ) => {
    await mutateAsync({
      params: {
        organisationId,
      },
      payload: {
        system_approved: systemApproved,
      },
    });

    refetch();
  };

  const extraColumns = [
    createDefaultColumn("actions", {
      header: "",
      cell: info => {
        const { system_approved, id } = info.row.original;

        return (
          <ActionMenu>
            {system_approved ? (
              <ActionMenuItem
                disabled
                onClick={() => {
                  handleApprove(id, false);
                }}>
                {t("unapprove")}
              </ActionMenuItem>
            ) : (
              <ActionMenuItem
                onClick={() => {
                  handleApprove(id, true);
                }}>
                {t("approve")}
              </ActionMenuItem>
            )}
          </ActionMenu>
        );
      },
    }),
  ];

  return <OrganisationsTable extraColumns={extraColumns} {...query} t={t} />;
}
