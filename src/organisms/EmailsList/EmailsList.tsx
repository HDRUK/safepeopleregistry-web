"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import FormModal from "@/components/FormModal";
import { Refresh } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Email } from "../../types/application";
import { EmailsFilters, EmailsTable, PageSection } from "../../modules";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import useColumns from "../../hooks/useColumns";
import { ActionMenu, ActionMenuItem } from "../../components/ActionMenu";
import {
  putResendEmailQuery,
  usePaginatedEmailsQuery,
} from "../../services/emails";

const NAMESPACE_TRANSLATIONS_TABLES = "Admin.EmailsTable";

export default function EmailsList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_TABLES);

  const { createDefaultColumn } = useColumns<Email>({ t });
  const [activeLog, setActiveLog] = useState<Email | null>(null);

  const { refetch, ...queryState } = usePaginatedEmailsQuery();

  const { mutateAsync: mutateAsyncResend, ...mutationStateResend } =
    useMutation(putResendEmailQuery());

  const handleResendEmail = async (id: number) => {
    await mutateAsyncResend({ params: { id } });
  };

  useQueryAlerts(mutationStateResend, {
    successAlertProps: {
      onConfirm: async () => {
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
            <ActionMenuItem onClick={() => setActiveLog(info.row.original)}>
              {t("viewLogs")}
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
        <Button startIcon={<Refresh />} onClick={() => refetch()}>
          Update
        </Button>
        <FormModal
          heading={t("heading")}
          open={!!activeLog}
          onClose={() => setActiveLog(null)}
          sx={{ minWidth: "800px" }}>
          <Typography variant="h6">{t("headingErrorMessage")}</Typography>
          <SyntaxHighlighter language="text">
            {activeLog?.error_message || "OK"}
          </SyntaxHighlighter>
          <Typography variant="h6">{t("headingSendGridResponse")}</Typography>
          <SyntaxHighlighter language="text">
            {activeLog?.message_response || "OK"}
          </SyntaxHighlighter>
        </FormModal>
        <EmailsTable extraColumns={extraColumns} {...queryState} t={t} />
      </PageSection>
    </>
  );
}
