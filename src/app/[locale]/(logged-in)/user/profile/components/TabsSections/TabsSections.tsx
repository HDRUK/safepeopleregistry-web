"use client";

import { useFeatures } from "@/components/FeatureProvider";
import Text from "@/components/Text";
import { OrganisationIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { useIncompleteAffiliations } from "@/services/affiliations";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

interface TabsSectionsProps {
  tabId: PageTabs;
}

export default function TabsSections({ tabId }: TabsSectionsProps) {
  const { routes, user } = useStore(store => ({
    routes: store.getApplication().routes,
    user: store.getUser(),
  }));
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { isLinkedIdentitiesEnabled } = useFeatures();

  const { incompleteAffiliations } = useIncompleteAffiliations(
    user?.registry_id
  );
  const hasIncompleteAffiliation = incompleteAffiliations.length > 0;

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Tabs
        variant="scrollable"
        value={tabId || PageTabs.HOME}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        indicatorColor="secondary"
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="inherit"
        data-cy="tabs-navigation">
        <Tab
          icon={<HomeOutlinedIcon />}
          label={<Text>{t("home")}</Text>}
          href={routes.profileResearcherHome.path}
          component={Link}
          value={PageTabs.HOME}
          iconPosition="start"
        />
        <Tab
          icon={<BadgeOutlinedIcon />}
          label={t("identity")}
          href={routes.profileResearcherIdentity.path}
          component={Link}
          value={PageTabs.IDENTITY}
          iconPosition="start"
        />
        {isLinkedIdentitiesEnabled && (
          <Tab
            icon={<FingerprintOutlinedIcon />}
            label={t("digitalIdentifiers")}
            href={routes.profileResearcherDigitalIdentifiers.path}
            component={Link}
            value={PageTabs.DIGITAL_IDENTIFIERS}
            iconPosition="start"
          />
        )}
        <Tab
          icon={<BusinessCenterOutlinedIcon />}
          label={t("experience")}
          href={routes.profileResearcherExperience.path}
          component={Link}
          value={PageTabs.EXPERIENCE}
          iconPosition="start"
        />
        <Tab
          icon={<OrganisationIcon />}
          label={
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
              {t("affiliations")}
              {hasIncompleteAffiliation && (
                <WarningAmberRoundedIcon
                  sx={{ color: "warning.dark" }}
                  fontSize="small"
                  titleAccess={t("affiliationsIncompleteIndicator")}
                />
              )}
            </Box>
          }
          href={routes.profileResearcherAffiliations.path}
          component={Link}
          value={PageTabs.AFFILIATIONS}
          iconPosition="start"
        />
        <Tab
          icon={<WorkspacePremiumOutlinedIcon />}
          label={t("training")}
          href={routes.profileResearcherTraining.path}
          component={Link}
          value={PageTabs.TRAINING}
          iconPosition="start"
        />
        <Tab
          icon={<AssignmentOutlinedIcon />}
          label={t("projects")}
          href={routes.profileResearcherProjects.path}
          component={Link}
          value={PageTabs.PROJECTS}
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
}
