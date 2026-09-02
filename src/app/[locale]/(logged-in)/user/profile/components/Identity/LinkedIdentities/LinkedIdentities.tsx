"use client";

import ActionCard from "@/components/ActionCard";
import { useFeatures } from "@/components/FeatureProvider";
import { IdentityProviderStatus, LinkStatus } from "@/consts/identity";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { PageSection } from "@/modules";
import {
  getLinkedIdentitiesQuery,
  unlinkIdentityQuery,
} from "@/services/identities";
import {
  IdentityProviderCatalogEntry,
  LinkedIdentity,
} from "@/services/identities";
import { User } from "@/types/application";
import { formatDisplayShortDate } from "@/utils/date";
import GitHubIcon from "@mui/icons-material/GitHub";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import { Badge } from "@mui/icons-material";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, ReactNode } from "react";
import IdentityRow from "./IdentityRow";

const NAMESPACE_TRANSLATION = "Users.Identity";

const PROVIDER_ICONS: Record<string, ReactNode> = {
  orcid: <Badge sx={{ color: "success.main" }} />,
  github: <GitHubIcon />,
};

function providerIcon(key: string) {
  return PROVIDER_ICONS[key] || <PublicIcon />;
}

export default function LinkedIdentities() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showAlert, hideAlert } = useAlertModal();
  const { isLinkedIdentitiesEnabled } = useFeatures();

  const { user } = useStore(state => ({
    user: state.getUser(),
  }));
  const { id: userId, email, user_group: userGroup } = (user as User) || {};
  const isResearcher = userGroup === UserGroup.USERS;
  const canShow = isResearcher && isLinkedIdentitiesEnabled;

  const linkedIdentitiesQuery = useQuery(
    getLinkedIdentitiesQuery(canShow ? userId : undefined)
  );
  const unlinkIdentity = useMutation(unlinkIdentityQuery());

  const refetch = () => {
    queryClient.refetchQueries({ queryKey: ["getLinkedIdentities", userId] });
  };

  useQueryAlerts(unlinkIdentity, {
    successAlertProps: { text: t("linkedIdentitiesUnlinkSuccess") },
    errorAlertProps: { text: t("linkedIdentitiesUnlinkError") },
    onSuccess: refetch,
  });

  useEffect(() => {
    const linkStatus = searchParams.get("linkStatus");

    if (!linkStatus) return;

    if (linkStatus === LinkStatus.SUCCESS) {
      showAlert({
        severity: "success",
        text: t("linkedIdentitiesLinkSuccess"),
        onConfirm: async () => hideAlert(),
        onClose: async () => hideAlert(),
      });
      refetch();
    } else {
      showAlert({
        severity: "error",
        text: t("linkedIdentitiesLinkError"),
        onConfirm: async () => hideAlert(),
        onClose: async () => hideAlert(),
      });
    }

    router.replace(ROUTES.profileResearcherIdentity.path);
  }, []);

  // Linking external identities is a researcher-only concept - organisations
  // and custodians aren't allowed to link/use other accounts - and the whole
  // feature is behind the LinkedIdentitiesEnabled flag. The API rejects
  // these calls in both cases too (see LinkedIdentityController).
  if (!canShow) return null;

  const data = linkedIdentitiesQuery.data?.data;
  const linked = data?.linked || [];
  const providers = data?.providers || [];

  const availableProviders = providers.filter(
    (provider: IdentityProviderCatalogEntry) =>
      provider.status === IdentityProviderStatus.ACTIVE && !provider.linked
  );
  const comingSoonProviders = providers.filter(
    (provider: IdentityProviderCatalogEntry) =>
      provider.status === IdentityProviderStatus.COMING_SOON
  );

  const recentActivity = [...linked]
    .filter(identity => !!identity.linked_at)
    .sort(
      (a, b) =>
        new Date(b.linked_at as string).getTime() -
        new Date(a.linked_at as string).getTime()
    );

  return (
    <PageSection heading={t("linkedIdentitiesTitle")}>
      <Typography sx={{ mb: 3 }} color="textSecondary">
        {t("linkedIdentitiesSubtitle")}
      </Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        <IdentityRow
          icon={<PersonIcon color="primary" />}
          title={t("linkedIdentitiesPrimaryLabel")}
          description={email}
          badgeText={t("linkedIdentitiesPrimaryBadge")}
          badgeColor="primary"
        />
        {linked.map((identity: LinkedIdentity) => {
          const provider = providers.find(
            (p: IdentityProviderCatalogEntry) => p.key === identity.provider
          );

          return (
            <IdentityRow
              key={identity.provider}
              icon={providerIcon(identity.provider)}
              title={provider?.label || identity.provider}
              description={provider?.description}
              badgeText={t("linkedIdentitiesLinkedBadge")}
              badgeColor="success"
              claims={identity.claims}
              action={
                <Button
                  size="small"
                  variant="outlined"
                  disabled={unlinkIdentity.isPending}
                  onClick={() => unlinkIdentity.mutate(identity.provider)}>
                  {t("linkedIdentitiesRemove")}
                </Button>
              }
            />
          );
        })}
      </Stack>

      <Typography
        variant="small"
        color="textSecondary"
        fontWeight={600}
        sx={{ mb: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {t("linkedIdentitiesAvailableTitle")}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {availableProviders.map((provider: IdentityProviderCatalogEntry) => (
          <Grid key={provider.key} size={{ xs: 12, md: 6 }}>
            <ActionCard
              icon={providerIcon(provider.key)}
              title={provider.label}
              description={provider.description}
              href={`/api/auth/link?provider=${provider.key}`}
              ctaLabel={t("linkedIdentitiesConnect")}
            />
          </Grid>
        ))}
        {comingSoonProviders.map((provider: IdentityProviderCatalogEntry) => (
          <Grid key={provider.key} size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: "100%",
                p: 3,
                borderRadius: 3,
                bgcolor: "grey.50",
                border: "1px dashed",
                borderColor: "grey.300",
                opacity: 0.7,
              }}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
                {providerIcon(provider.key)}
                <Typography variant="h3" component="h4">
                  {provider.label}
                </Typography>
              </Stack>
              <Typography sx={{ mb: 2 }}>{provider.description}</Typography>
              <Chip size="small" label={t("linkedIdentitiesComingSoon")} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {recentActivity.length > 0 && (
        <>
          <Typography
            variant="small"
            color="textSecondary"
            fontWeight={600}
            sx={{ mb: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {t("linkedIdentitiesRecentActivityTitle")}
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
            {recentActivity.map(identity => {
              const provider = providers.find(
                (p: IdentityProviderCatalogEntry) => p.key === identity.provider
              );

              return (
                <Box component="li" key={identity.provider}>
                  {t("linkedIdentitiesRecentActivityItem", {
                    provider: provider?.label || identity.provider,
                    date: formatDisplayShortDate(identity.linked_at) as string,
                  })}
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </PageSection>
  );
}
