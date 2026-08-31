"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { getSsoTenantsQuery, postSsoTenantQuery } from "@/services/sso_tenants";
import { SsoTenant, SsoTenantStatus } from "@/services/sso_tenants/types";
import SsoTenantSpDetails from "@/components/SsoTenantSpDetails";

const NAMESPACE_TRANSLATION = "SsoTenantsSubmission";

const STATUS_COLOR: Record<SsoTenantStatus, "warning" | "success" | "error"> = {
  pending: "warning",
  approved: "success",
  rejected: "error",
};

export default function SsoTenantsSubmission() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [detailsTenant, setDetailsTenant] = useState<SsoTenant | null>(null);
  const [name, setName] = useState("");
  const [metadataSource, setMetadataSource] = useState<"url" | "xml">("url");
  const [metadataValue, setMetadataValue] = useState("");
  const [domains, setDomains] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { data, isLoading } = useQuery(getSsoTenantsQuery());
  const { mutateAsync, isPending } = useMutation(postSsoTenantQuery());

  const tenants = data?.data?.data || [];

  const resetForm = () => {
    setName("");
    setMetadataSource("url");
    setMetadataValue("");
    setDomains("");
    setFormError(null);
  };

  const handleSubmit = async () => {
    const domainList = domains
      .split(",")
      .map(domain => domain.trim().toLowerCase())
      .filter(Boolean);

    if (!name || !metadataValue || domainList.length === 0) {
      setFormError(t("formMissingFields"));
      return;
    }

    try {
      await mutateAsync({
        name,
        domains: domainList,
        ...(metadataSource === "url"
          ? { metadata_url: metadataValue }
          : { metadata_xml: metadataValue }),
      });

      await queryClient.invalidateQueries({ queryKey: ["getSsoTenants"] });
      setIsOpen(false);
      resetForm();
    } catch {
      setFormError(t("formSubmitError"));
    }
  };

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>{t("intro")}</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("nameColumn")}</TableCell>
            <TableCell>{t("domainsColumn")}</TableCell>
            <TableCell>{t("statusColumn")}</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading && tenants.length === 0 && (
            <TableRow>
              <TableCell colSpan={4}>{t("noRequests")}</TableCell>
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
                  label={tenant.status}
                  color={STATUS_COLOR[tenant.status]}
                />
                {tenant.status === "rejected" && tenant.rejected_reason && (
                  <Typography variant="caption" display="block">
                    {tenant.rejected_reason}
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                {tenant.status === "approved" && (
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setDetailsTenant(tenant)}>
                    {t("connectionDetailsButton")}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setIsOpen(true)}>
        {t("requestConnectionButton")}
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          resetForm();
        }}
        fullWidth
        maxWidth="sm">
        <DialogTitle>{t("requestDialogTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("organisationNameLabel")}
            fullWidth
            required
            value={name}
            onChange={e => setName(e.target.value)}
            sx={{ mt: 1, mb: 2 }}
          />
          <RadioGroup
            row
            value={metadataSource}
            onChange={e => setMetadataSource(e.target.value as "url" | "xml")}
            sx={{ mb: 1 }}>
            <FormControlLabel
              value="url"
              control={<Radio />}
              label={t("metadataUrlOption")}
            />
            <FormControlLabel
              value="xml"
              control={<Radio />}
              label={t("metadataXmlOption")}
            />
          </RadioGroup>
          <TextField
            label={
              metadataSource === "url"
                ? t("metadataUrlLabel")
                : t("metadataXmlLabel")
            }
            fullWidth
            required
            multiline={metadataSource === "xml"}
            minRows={metadataSource === "xml" ? 4 : undefined}
            value={metadataValue}
            onChange={e => setMetadataValue(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label={t("domainsLabel")}
            fullWidth
            required
            placeholder={t("domainsPlaceholder")}
            value={domains}
            onChange={e => setDomains(e.target.value)}
          />
          {formError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {formError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpen(false);
              resetForm();
            }}>
            {t("cancelButton")}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isPending}>
            {t("submitButton")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!detailsTenant}
        onClose={() => setDetailsTenant(null)}
        fullWidth
        maxWidth="sm">
        <DialogTitle>
          {t("detailsDialogTitle", { name: detailsTenant?.name ?? "" })}
        </DialogTitle>
        <DialogContent>
          {detailsTenant && <SsoTenantSpDetails ssoTenant={detailsTenant} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsTenant(null)}>
            {t("closeButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
