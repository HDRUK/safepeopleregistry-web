"use client";
import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";
const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";
interface TabsSectionsProps {
  tabId: PageTabs;
}
export default function TabsSections({ tabId }: TabsSectionsProps) {
  const routes = useStore(store => store.application.routes);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Tabs
        data-cy="tabs-navigation"
        variant="fullWidth"
        value={tabId || PageTabs.HOME}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        indicatorColor="secondary"
        textColor="inherit"
        allowScrollButtonsMobile>
        <Tab
          icon={<HomeOutlinedIcon />}
          label={t("home")}
          href={routes.profileCustodianHome.path}
          component={Link}
          value={PageTabs.HOME}
          iconPosition="start"
        />
        <Tab
          icon={<ManageAccountsOutlinedIcon />}
          label={t("team")}
          href={routes.profileCustodianContacts.path}
          component={Link}
          value={PageTabs.CONTACTS}
          iconPosition="start"
        />
        <Tab
          icon={<GroupOutlinedIcon />}
          label={t("users")}
          href={routes.profileCustodianUsers.path}
          component={Link}
          value={PageTabs.USERS}
          iconPosition="start"
        />
        <Tab
          icon={<AssignmentOutlinedIcon />}
          label={t("projects")}
          href={routes.profileCustodianProjects.path}
          component={Link}
          value={PageTabs.PROJECTS}
          iconPosition="start"
        />
        <Tab
          icon={<CorporateFareIcon />}
          label={t("organisations")}
          href={routes.profileCustodianOrganisations.path}
          component={Link}
          value={PageTabs.ORGANISATIONS}
          iconPosition="start"
        />
        <Tab
          icon={<SettingsOutlinedIcon />}
          label={t("configuration")}
          href={routes.profileCustodianConfiguration.path}
          component={Link}
          value={PageTabs.CONFIGURATION}
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
}