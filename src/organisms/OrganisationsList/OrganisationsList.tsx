"use client";

import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import FormModal from "@/components/FormModal";
import { Status } from "@/consts/application";
import useColumns from "@/hooks/useColumns";
import { OrganisationsTable, PageSection } from "@/modules";
import SendInviteOrganisation from "@/modules/SendInviteOrganisation";
import {
  Organisation,
  putOrganisationApprovedQuery,
  useOrganisationsQuery,
} from "@/services/organisations";
import { getOrganisationAccountStatus } from "@/utils/organisation";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";

const NAMESPACE_TRANSLATIONS_ORGANISATIONS = "OrganisationsList";

export default function OrganisationsList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATIONS);
  const { createDefaultColumn } = useColumns<Organisation>({ t });

  const [organisationToInvite, setOrganisationToInvite] =
    useState<Organisation | null>(null);

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

        const canInvite = [
          Status.ORGANISATION_INVITED_BY_OTHER,
          Status.ORGANISATION_PLACEHOLDER,
        ].includes(getOrganisationAccountStatus(info.row.original));

        return (
          <ActionMenu>
            {({ handleClose }) => (
              <>
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
                {canInvite && (
                  <ActionMenuItem
                    onClick={() => {
                      handleClose();
                      setOrganisationToInvite(info.row.original);
                    }}>
                    {t("invite")}
                  </ActionMenuItem>
                )}
              </>
            )}
          </ActionMenu>
        );
      },
    }),
  ];

  return (
    <PageSection>
      <OrganisationsTable extraColumns={extraColumns} {...query} t={t} />
      {organisationToInvite && (
        <FormModal
          heading={t("inviteModalHeading")}
          open
          onClose={() => setOrganisationToInvite(null)}>
          <SendInviteOrganisation
            organisation={organisationToInvite}
            onSuccess={() => {
              setOrganisationToInvite(null);
              refetch();
            }}
            actions={{ onCancel: () => setOrganisationToInvite(null) }}
          />
        </FormModal>
      )}
    </PageSection>
  );
}
