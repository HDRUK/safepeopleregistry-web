"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  deleteSsoTenantQuery,
  getSsoTenantsQuery,
  postSsoTenantApproveQuery,
  postSsoTenantEnableQuery,
  postSsoTenantRejectQuery,
  purgeSsoTenantQuery,
} from "@/services/sso_tenants";
import { SsoTenant, SsoTenantStatus } from "@/services/sso_tenants/types";
import FormModal from "@/components/FormModal";
import SsoTenantSpDetails from "@/components/SsoTenantSpDetails";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";

const NAMESPACE_TRANSLATION = "SsoTenantsAdminList";

const STATUS_COLOR: Record<SsoTenantStatus, "warning" | "success" | "error"> = {
  pending: "warning",
  approved: "success",
  rejected: "error",
};

export default function SsoTenantsAdminList() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();
  const [detailsTenant, setDetailsTenant] = useState<SsoTenant | null>(null);

  const { data, isLoading } = useQuery(getSsoTenantsQuery());
  const { mutateAsync: approve, isPending: isApproving } = useMutation(
    postSsoTenantApproveQuery()
  );
  const { mutateAsync: reject, isPending: isRejecting } = useMutation(
    postSsoTenantRejectQuery()
  );
  const { mutateAsync: disable, isPending: isDisabling } = useMutation(
    deleteSsoTenantQuery()
  );
  const { mutateAsync: enable, isPending: isEnabling } = useMutation(
    postSsoTenantEnableQuery()
  );
  const {
    mutateAsync: purge,
    isPending: isPurging,
    ...purgeQueryState
  } = useMutation(purgeSsoTenantQuery());

  const isBusy =
    isApproving || isRejecting || isDisabling || isEnabling || isPurging;

  const refresh = () =>
    queryClient.invalidateQueries({ queryKey: ["getSsoTenants"] });

  const tenants = data?.data?.data || [];

  const handleReject = async (id: number) => {
    const reason = window.prompt(t("rejectReasonPrompt")) || "";
    await reject({ id, reason });
    await refresh();
  };

  const showPurgeConfirm = useQueryConfirmAlerts<SsoTenant>(purgeQueryState, {
    onSuccess: () => refresh(),
    confirmAlertProps: {
      severity: "warning",
      title: t("deleteConfirmTitle"),
      text: t("deleteConfirmText"),
      confirmButtonText: t("deleteConfirmButton"),
      confirmButtonColor: "error",
      onConfirm: async (tenant: SsoTenant) => {
        await purge(tenant.id);
      },
    },
    errorAlertProps: {
      text: t("deleteErrorText"),
    },
    successAlertProps: {
      text: t("deleteSuccessText"),
    },
  });

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>{t("intro")}</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("nameColumn")}</TableCell>
            <TableCell>{t("domainsColumn")}</TableCell>
            <TableCell>{t("statusColumn")}</TableCell>
            <TableCell>{t("actionsColumn")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading && tenants.length === 0 && (
            <TableRow>
              <TableCell colSpan={4}>{t("noConnections")}</TableCell>
            </TableRow>
          )}
          {tenants.map(tenant => (
            <TableRow key={tenant.id}>
              <TableCell>{tenant.name}</TableCell>
              <TableCell>
                {tenant.domains.map(domain => domain.domain).join(", ")}
              </TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={tenant.status.toUpperCase()}
                  color={STATUS_COLOR[tenant.status]}
                />
                {!tenant.enabled && tenant.status === "approved" && (
                  <Chip
                    size="small"
                    label={t("disabledLabel")}
                    sx={{ ml: 1 }}
                  />
                )}
              </TableCell>
              <TableCell>
                {tenant.status === "pending" && (
                  <>
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={isBusy}
                      onClick={async () => {
                        await approve(tenant.id);
                        await refresh();
                      }}
                      sx={{ mr: 1 }}>
                      {t("approveButton")}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      disabled={isBusy}
                      onClick={() => handleReject(tenant.id)}
                      sx={{ mr: 1 }}>
                      {t("rejectButton")}
                    </Button>
                  </>
                )}
                {tenant.status === "approved" && (
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setDetailsTenant(tenant)}
                    sx={{ mr: 1 }}>
                    {t("connectionDetailsButton")}
                  </Button>
                )}
                {tenant.status === "approved" && tenant.enabled && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    disabled={isBusy}
                    onClick={async () => {
                      await disable(tenant.id);
                      await refresh();
                    }}
                    sx={{ mr: 1 }}>
                    {t("disableButton")}
                  </Button>
                )}
                {tenant.status === "approved" && !tenant.enabled && (
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={isBusy}
                    onClick={async () => {
                      await enable(tenant.id);
                      await refresh();
                    }}
                    sx={{ mr: 1 }}>
                    {t("enableButton")}
                  </Button>
                )}
                <Button
                  size="small"
                  variant="text"
                  color="error"
                  disabled={isBusy}
                  onClick={() => showPurgeConfirm(tenant)}>
                  {t("deleteButton")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <FormModal
        open={!!detailsTenant}
        onClose={() => setDetailsTenant(null)}
        variant="content"
        heading={t("detailsDialogTitle", { name: detailsTenant?.name ?? "" })}>
        {detailsTenant && <SsoTenantSpDetails ssoTenant={detailsTenant} />}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button onClick={() => setDetailsTenant(null)}>
            {t("closeButton")}
          </Button>
        </Box>
      </FormModal>
    </Box>
  );
}
