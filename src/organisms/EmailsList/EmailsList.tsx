"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ActionMenu, ActionMenuItem } from "../../components/ActionMenu";
import useColumns from "../../hooks/useColumns";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import { EmailsFilters, EmailsTable, PageSection } from "../../modules";
import { Email } from "../../types/application";

import FormModal from "@/components/FormModal";
import Text from "@/components/Text";
import { Refresh } from "@mui/icons-material";
import { Link, Typography } from "@mui/material";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
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
        <Link component="button" onClick={() => refetch()}>
          <Text startIcon={<Refresh />}>Update</Text>
        </Link>
        <FormModal
          heading={t("heading")}
          open={!!activeLog}
          onClose={() => setActiveLog(null)}
          sx={{ minWidth: "800px" }}>
          <Typography variant="h6">{t("headingErrorMessage")}</Typography>
          <SyntaxHighlighter language="text">
            {activeLog?.error_message}
          </SyntaxHighlighter>
          <Typography variant="h6">{t("headingSendGridResponse")}</Typography>
          <SyntaxHighlighter language="text">
            {activeLog?.message_response}
          </SyntaxHighlighter>
        </FormModal>
        <EmailsTable extraColumns={extraColumns} {...queryState} t={t} />
      </PageSection>
    </>
  );
}
