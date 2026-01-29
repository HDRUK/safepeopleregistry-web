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
  getEmailLogQuery,
  usePaginatedEmailsQuery,
} from "../../services/emails";
import { Status } from "@/consts/application";

const NAMESPACE_TRANSLATIONS_TABLES = "Admin.EmailsTable";

export default function EmailsList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_TABLES);

  const { createDefaultColumn } = useColumns<Email>({ t });

  const { refetch, ...queryState } = usePaginatedEmailsQuery();

  const { mutateAsync: mutateAsyncResend, ...mutationStateResend } =
    useMutation(putResendEmailQuery());

  const { mutateAsync: mutateAsyncGetLog, ...mutationStateGetLog } =
    useMutation(getEmailLogQuery());

  const handleResendEmail = async (id: number) => {
    await mutateAsyncResend(id);
  };

  const handleGetEmailLog = async (id: number) => {
    await mutateAsyncGetLog(id);
  };

  useQueryAlerts(mutationStateResend, {
    onSuccess: () => {
      refetch();
    },
  });

  const extraColumns = [
    createDefaultColumn("actions", {
      header: "",
      cell: info => {
        const { id, job_status } = info.row.original;

        return (
          <ActionMenu>
            {!job_status && (
              <ActionMenuItem
                disabled={job_status}
                onClick={() => handleResendEmail(id)}>
                Resend email
              </ActionMenuItem>
            )}
            <ActionMenuItem onClick={() => handleGetEmailLog(id)}>
              Detailed log
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
