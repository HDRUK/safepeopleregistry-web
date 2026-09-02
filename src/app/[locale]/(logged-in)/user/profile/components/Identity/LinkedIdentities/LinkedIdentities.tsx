"use client";

import ActionCard from "@/components/ActionCard";
import { useFeatures } from "@/components/FeatureProvider";
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

const NAMESPACE_TRANSLATION = "Users.Identity";

const PROVIDER_ICONS: Record<string, ReactNode> = {
  orcid: <Badge sx={{ color: "success.main" }} />,
  github: <GitHubIcon />,
};

function providerIcon(key: string) {
  return PROVIDER_ICONS[key] || <PublicIcon />;
}

interface ClaimListProps {
  claims: Record<string, unknown> | null;
}

function ClaimList({ claims }: ClaimListProps) {
  if (!claims) return null;

  const entries = Object.entries(claims).filter(([, value]) => !!value);

  if (!entries.length) return null;

  return (
    <Box component="ul" sx={{ m: 0, pl: 2.5, mt: 1 }}>
      {entries.map(([key, value]) => (
        <Box component="li" key={key}>
          <Typography component="span" fontWeight={600}>
            {key}
          </Typography>
          {": "}
          {String(value)}
        </Box>
      ))}
    </Box>
  );
}

interface IdentityRowProps {
  icon: ReactNode;
  title: string;
  description?: string;
  badgeText: string;
  badgeColor: "primary" | "success";
  claims?: Record<string, unknown> | null;
  action?: ReactNode;
}

function IdentityRow({
  icon,
  title,
  description,
  badgeText,
  badgeColor,
  claims,
  action,
}: IdentityRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: "grey.100",
      }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ pt: 0.5 }}>{icon}</Box>
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontWeight={600}>{title}</Typography>
            <Chip size="small" color={badgeColor} label={badgeText} />
          </Stack>
          {description && (
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          )}
          <ClaimList claims={claims ?? null} />
        </Box>
      </Box>
      {action}
    </Box>
  );
}

export default function LinkedIdentities() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showAlert } = useAlertModal();
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

    if (linkStatus === "success") {
      showAlert({
        severity: "success",
        text: t("linkedIdentitiesLinkSuccess"),
      });
      refetch();
    } else {
      showAlert({
        severity: "error",
        text: t("linkedIdentitiesLinkError"),
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
      provider.status === "active" && !provider.linked
  );
  const comingSoonProviders = providers.filter(
    (provider: IdentityProviderCatalogEntry) =>
      provider.status === "coming_soon"
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
