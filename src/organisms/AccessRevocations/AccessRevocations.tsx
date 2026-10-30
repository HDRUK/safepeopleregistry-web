import ErrorMessage from "@/components/ErrorMessage";
import Table from "@/components/Table";
import useColumns from "@/hooks/useColumns";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import { PageSection } from "@/modules";
import {
  CustodianAccessRevocation,
  putCustodianAccessRevokedQuery,
  usePaginatedCustodianAccessRevocations,
} from "@/services/custodians";
import { getName } from "@/utils/application";
import { formatShortDate } from "@/utils/date";
import { Alert, Button, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const NAMESPACE_TRANSLATION = "AccessRevocations";

export interface AccessRevocationsProps {
  custodianId: number;
}

/**
 * Users who left a project when their affiliation ended. That does not revoke their real data
 * access, so each is listed until the Custodian confirms they have revoked it.
 */
export default function AccessRevocations({
  custodianId,
}: AccessRevocationsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { createDefaultColumn } = useColumns<CustodianAccessRevocation>({ t });

  const { data, total, last_page, page, setPage, refetch, ...queryState } =
    usePaginatedCustodianAccessRevocations(custodianId);

  const { mutateAsync: confirmAccessRevoked, ...mutationState } = useMutation(
    putCustodianAccessRevokedQuery()
  );

  const showConfirm = useQueryConfirmAlerts<number>(mutationState, {
    onSuccess: () => refetch(),
    confirmAlertProps: {
      title: t("confirmTitle"),
      text: t("confirmDescription"),
      confirmButtonText: t("confirmButton"),
      confirmButtonColor: "primary",
      onConfirm: async custodianProjectUserId => {
        await confirmAccessRevoked({
          params: {
            custodianId,
            custodianProjectUserId: custodianProjectUserId as number,
          },
        });
      },
    },
    successAlertProps: {
      text: t("successDescription"),
    },
    errorAlertProps: {
      text: <ErrorMessage t={t} tKey="errorDescription" />,
    },
  });

  const columns = useMemo<ColumnDef<CustodianAccessRevocation>[]>(
    () => [
      createDefaultColumn("name", {
        cell: ({ row }) => getName(row.original.project_has_user.registry.user),
      }),
      createDefaultColumn("organisation", {
        cell: ({ row }) =>
          row.original.project_has_user.affiliation.organisation
            ?.organisation_name,
      }),
      createDefaultColumn("project", {
        cell: ({ row }) => row.original.project_has_user.project.title,
      }),
      createDefaultColumn("leaveDate", {
        cell: ({ row }) =>
          formatShortDate(row.original.project_has_user.affiliation.to),
      }),
      createDefaultColumn("recordedDate", {
        cell: ({ row }) =>
          formatShortDate(
            row.original.project_has_user.affiliation.end_date_recorded_at
          ),
      }),
      createDefaultColumn("actions", {
        cell: ({ row }: CellContext<CustodianAccessRevocation, unknown>) => (
          <Button size="small" onClick={() => showConfirm(row.original.id)}>
            {t("confirmButton")}
          </Button>
        ),
      }),
    ],
    [t, showConfirm]
  );

  // Only hide the panel once it is known there is nothing to revoke, so a load error is still shown.
  if (!queryState.isLoading && !queryState.isError && !total) return null;

  return (
    <PageSection>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {t("heading")}
      </Typography>
      <Alert severity="warning" sx={{ mb: 2 }}>
        {t("description")}
      </Alert>
      <Table
        data={data}
        columns={columns}
        queryState={queryState}
        total={total}
        last_page={last_page}
        page={page}
        setPage={setPage}
        isPaginated
        errorMessage={<ErrorMessage t={t} tKey="errorMessage" />}
      />
    </PageSection>
  );
}
