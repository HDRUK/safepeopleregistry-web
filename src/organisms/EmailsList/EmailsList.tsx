"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import FormModal from "@/components/FormModal";
import { getCombinedQueryState } from "@/utils/query";
import { Refresh } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ActionMenu, ActionMenuItem } from "../../components/ActionMenu";
import useColumns from "../../hooks/useColumns";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import { EmailsFilters, EmailsTable, PageSection } from "../../modules";
import {
  putEmailStatusQuery,
  putResendEmailQuery,
  usePaginatedEmailsQuery,
} from "../../services/emails";
import { Email } from "../../types/application";

const NAMESPACE_TRANSLATIONS_TABLES = "Admin.EmailsTable";

export default function EmailsList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_TABLES);

  const { createDefaultColumn } = useColumns<Email>({ t });
  const [activeLog, setActiveLog] = useState<Email | null>(null);

  const { refetch, ...queryState } = usePaginatedEmailsQuery();

  const { mutateAsync: mutateAsyncResend, ...mutationStateResend } =
    useMutation(putResendEmailQuery());

  const { mutateAsync: mutateAsyncStatus, ...mutationStateStatus } =
    useMutation(putEmailStatusQuery());

  const handleResendEmail = async (id: number) => {
    await mutateAsyncResend({ params: { id } });
  };

  const handleUpdateSendGridLogs = async (id: number) => {
    const { data } = await mutateAsyncStatus({ params: { id } });

    if (activeLog) {
      setActiveLog({
        ...activeLog,
        message_response: data,
        message_status: data.status,
      });
    }
  };

  const mutationState = getCombinedQueryState(
    [mutationStateStatus, mutationStateResend],
    false
  );

  useQueryAlerts(mutationState, {
    commonAlertProps: {
      onConfirm: async () => {
        refetch();

        mutationStateResend.reset();
        mutationStateStatus.reset();
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
            <ActionMenuItem onClick={() => handleUpdateSendGridLogs(id)}>
              {t("updateSendGridLogs")}
            </ActionMenuItem>
          </ActionMenu>
        );
      },
    }),
  ];

  const getMessageResponse = (data: Email) => {
    try {
      let json = data?.message_response;

      if (typeof json === "string") {
        json = JSON.parse(json);
      }

      return JSON.stringify(json, null, 2);
    } catch (_) {
      return activeLog?.message_response;
    }
  };

  return (
    <>
      <PageSection>
        <EmailsFilters {...queryState} />
      </PageSection>
      <PageSection>
        <LoadingButton
          loading={mutationStateStatus.isPending}
          startIcon={<Refresh />}
          onClick={() => refetch()}>
          Update
        </LoadingButton>
        <FormModal
          heading={t("heading")}
          open={!!activeLog}
          onClose={() => setActiveLog(null)}
          sx={{ width: "800px" }}>
          <Typography variant="h6">{t("headingErrorMessage")}</Typography>
          <SyntaxHighlighter language="text">
            {activeLog?.error_message || t("noErrorFound")}
          </SyntaxHighlighter>
          <Typography variant="h6" sx={{ display: "flex", gap: 1 }}>
            {t("headingSendGridResponse")}{" "}
            {!mutationStateStatus.isPending ? (
              <Refresh
                onClick={() => handleUpdateSendGridLogs(activeLog.id)}
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              />
            ) : (
              <CircularProgress size="1em" />
            )}
          </Typography>
          <SyntaxHighlighter language="json">
            {(activeLog?.message_response && getMessageResponse(activeLog)) ||
              t("noSendGridResponse")}
          </SyntaxHighlighter>
        </FormModal>
        <EmailsTable extraColumns={extraColumns} {...queryState} t={t} />
      </PageSection>
    </>
  );
}
