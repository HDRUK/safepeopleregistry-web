"use client";

import {
  BookIcon,
  DiversityIcon,
  MailIcon,
  MessageIcon,
  QuizIcon,
} from "@/components/icons";
import links from "@/consts/links";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { getMeQuery } from "@/services/auth";
import { Link } from "@/i18n/routing";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { MouseEvent, useState } from "react";

const HELP_LINKS: Partial<Record<UserGroup, string>> = {
  [UserGroup.USERS]: links.help.user,
  [UserGroup.CUSTODIANS]: links.help.custodian,
  [UserGroup.ORGANISATIONS]: links.help.organisation,
};

const NAMESPACE_TRANSLATIONS = "NavBar";

export default function SupportMenu() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data: meResponse } = useQuery(
    getMeQuery({ responseOptions: { suppressThrow: true } })
  );
  const userGroup = meResponse?.data?.user_group as UserGroup | undefined;
  const helpLink = (userGroup && HELP_LINKS[userGroup]) ?? links.help.loggedOut;

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const items = [
    {
      icon: <QuizIcon fontSize="small" />,
      label: t("supportReadFAQs"),
      href: ROUTES.faq.path,
    },
    {
      icon: <BookIcon fontSize="small" />,
      label: t("supportViewGlossary"),
      href: ROUTES.glossary.path,
    },
    {
      icon: <DiversityIcon fontSize="small" />,
      label: t("supportGetInvolved"),
      href: ROUTES.getInvolved.path,
    },
    {
      icon: <MessageIcon fontSize="small" />,
      label: t("supportAskTeam"),
      href: helpLink,
      external: true,
    },
    {
      icon: <MailIcon fontSize="small" />,
      label: t("supportContactUs"),
      href: ROUTES.contact.path,
    },
  ];

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        onClick={handleOpen}
        endIcon={
          <ExpandMoreIcon
            sx={{
              transition: "transform 0.2s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        }
        aria-controls={open ? "support-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}>
        {t("getSupportButton")}
      </Button>
      <Menu
        id="support-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          list: { disablePadding: true },
          paper: {
            sx: {
              mt: 0.5,
              "& .MuiListItemIcon-root": {
                color: "secondary.main",
              },
              "& .MuiListItemText-primary": {
                color: "secondary.main",
              },
            },
          },
        }}>
        {items.map(item => (
          <MenuItem
            key={item.label}
            component={item.external ? "a" : Link}
            href={item.href}
            {...(item.external && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
            onClick={handleClose}
            sx={{ py: 1.5, px: 1.5 }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              slotProps={{ primary: { variant: "body2" } }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
