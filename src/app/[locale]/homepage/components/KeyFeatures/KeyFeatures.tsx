"use client";

import { Box, Typography } from "@mui/material";

import theme from "@/theme";
import { getLoginUrl } from "@/utils/keycloak";
import { ROUTES } from "@/consts/router";
import { Link } from "@/i18n/routing";
import {
  StyledContent,
  StyledArticleContainer,
  StyledSectionFlex,
} from "./KeyFeatures.styles";

export default function KeyFeatures() {
  return (
    <StyledContent>
      <Typography variant="h1" component="h5" sx={{ mb: "16px" }}>
        Key Features
      </Typography>
      <Typography
        variant="h3"
        component="h6"
        sx={{
          fontWeight: "light",
          color: theme.palette.homepageKeyFeatures.textSecondary,
        }}>
        Capabilities for Users, Organisations, and Data Custodians
      </Typography>
      <StyledSectionFlex width="100%">
        <StyledArticleContainer>
          <Typography
            variant="h5"
            component="h6"
            sx={{ marginBottom: "16px", fontWeight: "500" }}>
            User and Organisation Registers
          </Typography>
          <Typography variant="body1" color="textSecondary.main">
            A platform for Users (researchers, analysts, innovators, students,
            and others who access sensitive data) and Organisations to create
            profiles and share relevant information for Data Custodians to
            assess if a person is ‘Safe’.
          </Typography>
        </StyledArticleContainer>
        <StyledArticleContainer>
          <Typography
            variant="h5"
            component="h6"
            sx={{ marginBottom: "16px", fontWeight: "500" }}>
            Visibility across Data Custodians
          </Typography>
          <Typography variant="body1" color="textSecondary.main">
            Safe People Registry records Data Custodian approvals for previous
            and current projects as well as approvals for other functionality in
            complementary systems.
          </Typography>
        </StyledArticleContainer>
        <StyledArticleContainer>
          <Typography
            variant="h5"
            component="h6"
            sx={{ marginBottom: "16px", fontWeight: "500" }}>
            Multiple authentication routes
          </Typography>
          <Typography variant="body1" color="textSecondary.main">
            Safe People Registry provides Single Sign-On (SSO) through multiple
            providers, such as; Google, LinkedIn and LSRI via Keycloak. This
            enables users to easily associate their Safe People Registry account
            with existing credentials.
          </Typography>
        </StyledArticleContainer>
      </StyledSectionFlex>
      <Box
        sx={{ mt: 2, mb: 3 }}
        width={{
          md: "854px",
          xs: "427px",
        }}
        height={{
          md: "480px",
          xs: "240px",
        }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/kYLO_7gtBRo?si=sfXW1gOBlgS-5Str"
          title="Safe People Registry"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </Box>
      <Typography variant="h4" color="primary">
        <Link href={ROUTES.register.path}>
          Register for an account to get started
        </Link>{" "}
        or <Link href={getLoginUrl()}>sign in here</Link>
      </Typography>
    </StyledContent>
  );
}
