"use client";

import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SoursdLogo from "@/components/SoursdLogo";
import UL from "@/components/UL";
import Link from "next/link";
import { CONTACT_MAIL_ADDRESS } from "../../config/contacts";
import PageCenter from "../PageCenter";
import {
  StyledBox,
  StyledFooter,
  StyledFooterImageWrapper,
} from "./Footer.styles";

const NAMESPACE_TRANSLATIONS_FOOTER = "Footer";

export default function Footer() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_FOOTER);

  const footerLinkPages = [
    {
      href: "/about",
      label: t("aboutUsLink"),
    },
    {
      href: `mailto:${CONTACT_MAIL_ADDRESS}`,
      label: t("contactUsLink"),
    },
    {
      href: "/privacy-policy",
      label: t("privacyLink"),
    },
    {
      href: "/cookie-policy",
      label: t("cookieLink"),
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "24px solid",
        borderColor: "midGrey.main",
        minHeight: 157,
        backgroundColor: "white",
      }}>
      <PageCenter>
        <StyledFooter>
          <SoursdLogo
            variant="titled"
            direction="horizontal"
            sx={{ mb: 1, alignSelf: "flex-end" }}
          />
          <Box
            sx={{
              display: "flex",
              flexGrow: {
                md: 1,
              },
            }}>
            <Box
              sx={{
                alignSelf: "flex-end",
                mb: 2,
              }}>
              <UL>
                {footerLinkPages.map(({ label, ...linkProps }) => (
                  <li key={label}>
                    <Box
                      component={Link}
                      sx={{
                        color: "textSecondary.main",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "medium",
                      }}
                      {...linkProps}>
                      {label}
                    </Box>
                  </li>
                ))}
              </UL>
              <Typography color="textSecondary.main">
                {t("copyright")}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
            }}>
            <StyledFooterImageWrapper>
              <Typography sx={{ fontWeight: 600, color: "textSecondary.main" }}>
                {t("poweredByTitle")}
              </Typography>
              <StyledBox>
                <Image
                  src="/images/logos/hdruk.svg"
                  width={153}
                  height={54}
                  alt={t("hdrLogoAlt")}
                />
              </StyledBox>
            </StyledFooterImageWrapper>
            <StyledFooterImageWrapper>
              <Typography sx={{ fontWeight: 600, color: "textSecondary.main" }}>
                {t("fundedByTitle")}
              </Typography>
              <StyledBox>
                <Image
                  src="/images/logos/mrc.svg"
                  width={180}
                  height={61}
                  alt={t("mrcLogoAlt")}
                />
                <Image
                  src="/images/logos/dsit.svg"
                  width={108}
                  height={61}
                  alt={t("dsitLogoAlt")}
                />
              </StyledBox>
            </StyledFooterImageWrapper>
          </Box>
        </StyledFooter>
      </PageCenter>
    </Box>
  );
}
