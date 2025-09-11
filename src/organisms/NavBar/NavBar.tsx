"use client";

import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import getMe from "@/services/auth/getMe";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  MenuList,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import HorizontalDrawer from "../../components/HorizontalDrawer";
import MaskLabel from "../../components/MaskLabel";
import SoursdLogo from "../../components/SoursdLogo";
import { CONTACT_MAIL_ADDRESS } from "../../config/contacts";
import PageCenter from "../../modules/PageCenter";
import { getInitials } from "../../utils/application";
import { handleLogin, handleLogout } from "../../utils/keycloak";
import NotificationsMenu from "../NotificationsMenu";
import { StyledContainer, StyledHeader } from "./NavBar.styles";

const NAMESPACE_TRANSLATIONS_NAVBAR = "NavBar";

export enum ButtonColor {
  Primary = "primary",
  Secondary = "secondary",
  Inherit = "inherit",
}

export enum ButtonVariant {
  Contained = "contained",
  Text = "text",
  Outlined = "outlined",
}

interface ButtonProps {
  color: ButtonColor;
  variant: ButtonVariant;
  text?: string;
  icon?: React.ReactNode;
  isSign?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
}

function renderButtons(
  buttons: ButtonProps[],
  options?: {
    asMenuItem?: boolean;
    fullWidth?: boolean;
  }
): React.ReactNode {
  const { asMenuItem = false, fullWidth = false } = options || {};

  return buttons.map(({ text, icon, href, onClick, ...restProps }, index) => {
    const content = text || icon;
    const key = `${text || index}`;

    const button = href ? (
      <Button
        component={Link}
        href={href}
        key={key}
        fullWidth={fullWidth}
        {...restProps}>
        {content}
      </Button>
    ) : (
      <Button key={key} onClick={onClick} fullWidth={fullWidth} {...restProps}>
        {content}
      </Button>
    );

    return asMenuItem ? (
      <MenuItem
        key={`menu-${key}`}
        sx={{ "&:hover": { backgroundColor: "transparent" } }}>
        {button}
      </MenuItem>
    ) : (
      button
    );
  });
}

interface NavBarProps {
  loggedIn?: boolean;
}

export default function NavBar({ loggedIn }: NavBarProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_NAVBAR);
  const router = useRouter();
  const [storedUser, setUser] = useStore(store => [
    store.getUser(),
    store.setUser,
  ]);

  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const checkUserAndReset = async () => {
      const response = await getMe({
        suppressThrow: true,
      });

      if (response.status === 404 && storedUser) {
        setUser(undefined);
      }
    };
    checkUserAndReset();
  }, []);

  useEffect(() => {
    if (isDesktop && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [isDesktop, isDrawerOpen]);

  const left_buttons: ButtonProps[] = [
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: storedUser ? t("myAccountButton") : t("homeButton"),
      href: "/",
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("aboutButton"),
      href: "/about",
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("featuresButton"),
      href: "/features",
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("contactButton"),
      href: `mailto:${CONTACT_MAIL_ADDRESS}`,
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("helpButton"),
      href: "/support",
    },
  ];
  const right_buttons: ButtonProps[] = [
    {
      color: ButtonColor.Primary,
      variant: ButtonVariant.Outlined,
      text: loggedIn ? t("signOutButton") : t("signInButton"),
      onClick: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();

        if (loggedIn) {
          handleLogout();
        } else {
          handleLogin();
        }
      },
    },
    ...(loggedIn
      ? []
      : [
          {
            color: ButtonColor.Primary,
            variant: ButtonVariant.Contained,
            text: t("registerButton"),
            onClick: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
              e.preventDefault();
              router.push(ROUTES.register.path);
            },
          },
        ]),
  ];

  return (
    <StyledContainer>
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
        data-testid="header-desktop-menu">
        <PageCenter>
          <StyledHeader>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
              }}>
              <SoursdLogo
                variant="titled"
                direction="horizontal"
                sx={{ mr: 4 }}
              />
              {renderButtons(left_buttons)}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {renderButtons(right_buttons)}
              {storedUser?.unclaimed === 0 && <NotificationsMenu />}
              {storedUser?.unclaimed === 0 && (
                <MaskLabel
                  initials={`${getInitials(`${storedUser?.first_name} ${storedUser?.last_name}`)}`}
                  label=""
                  size="small"
                />
              )}
            </Box>
          </StyledHeader>
        </PageCenter>
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}>
        <Box sx={{ display: "flex", minHeight: 46, alignItems: "center" }}>
          <div>
            <IconButton
              color={ButtonColor.Inherit}
              aria-label={t("ariaOpenMobileMenu")}
              edge="start"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              sx={{ mx: 0 }}>
              <MenuIcon />
            </IconButton>
          </div>
          <Box
            sx={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}>
            <SoursdLogo size={40} />
          </Box>
        </Box>
        <HorizontalDrawer
          data-testid="header-mobile-menu"
          component="nav"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              minWidth: "200px",
            },
          }}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          dismissAriaLabel={t("ariaCloseMobileMenu")}
          isDismissable>
          <MenuList>
            {renderButtons(left_buttons, { asMenuItem: true, fullWidth: true })}
            {renderButtons(right_buttons, {
              asMenuItem: true,
              fullWidth: true,
            })}
            {storedUser?.unclaimed === 0 && (
              <MenuItem
                key="Notifications"
                sx={{
                  "&:hover": { backgroundColor: "transparent" },
                  justifyContent: "center",
                }}>
                <NotificationsMenu />{" "}
              </MenuItem>
            )}
          </MenuList>
        </HorizontalDrawer>
      </Box>
    </StyledContainer>
  );
}
