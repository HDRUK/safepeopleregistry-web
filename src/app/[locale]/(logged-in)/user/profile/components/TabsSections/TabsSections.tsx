"use client";

import Text from "@/components/Text";
import { OrganisationIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

interface TabsSectionsProps {
  tabId: PageTabs;
}

export default function TabsSections({ tabId }: TabsSectionsProps) {
  const routes = useStore(store => store.getApplication().routes);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <Box sx={{ width: "100%", mb: 4 }} component="nav">
      <Tabs
        variant="scrollable"
        value={tabId || PageTabs.HOME}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        indicatorColor="secondary"
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="inherit">
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
          label={t("affiliations")}
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
