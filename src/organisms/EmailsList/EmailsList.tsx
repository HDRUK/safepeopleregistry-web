"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ActionMenu, ActionMenuItem } from "../../components/ActionMenu";
import useColumns from "../../hooks/useColumns";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import { EmailsFilters, EmailsTable, PageSection } from "../../modules";
import { Email } from "../../types/application";

import {
  putResendEmailQuery,
  usePaginatedEmailsQuery,
} from "../../services/emails";

const NAMESPACE_TRANSLATIONS_TABLES = "Admin.EmailsTable";

export default function EmailsList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_TABLES);

  const { createDefaultColumn } = useColumns<Email>({ t });

  const { refetch, ...queryState } = usePaginatedEmailsQuery();

  const { mutateAsync: mutateAsyncResend, ...mutationStateResend } =
    useMutation(putResendEmailQuery());

  const handleResendEmail = async (id: number) => {
    await mutateAsyncResend({ params: { id } });
  };

  useQueryAlerts(mutationStateResend, {
    successAlertProps: {
      onConfirm: () => {
        refetch();
      },
    },
  });

  const extraColumns = [
    createDefaultColumn("actions", {
      header: "",
      cell: info => {
        const { id } = info.row.original;

        return (
          <ActionMenu>
            <ActionMenuItem onClick={() => handleResendEmail(id)}>
              {t("resendEmail")}
            </ActionMenuItem>
          </ActionMenu>
        );
      },
    }),
  ];

  return (
    <>
      <PageSection>
        <EmailsFilters {...queryState} />
      </PageSection>
      <PageSection>
        <EmailsTable extraColumns={extraColumns} {...queryState} t={t} />
      </PageSection>
    </>
  );
}
