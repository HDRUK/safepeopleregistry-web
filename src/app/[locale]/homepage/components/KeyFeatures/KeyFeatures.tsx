"use client";

import { Typography } from "@mui/material";

import theme from "@/theme";
import { getLoginUrl, getRegisterUrl } from "@/utils/keycloak";
import {
  StyledContent,
  StyledFlex,
  StyledContainer,
} from "./KeyFeatures.styles";

export default function KeyFeatures() {
  return (
    <StyledContent>
      <Typography variant="h1" sx={{ mb: "16px" }}>
        Key Features
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "light",
          color: theme.palette.homepageKeyFeatures.textSecondary,
        }}>
        Capabilities for Users, Organisations, and Data Custodians
      </Typography>
      <StyledFlex width="100%">
        <StyledContainer>
          <Typography
            variant="h5"
            sx={{ marginBottom: "16px", fontWeight: "500" }}>
            User and Organisation Registers
          </Typography>
          <Typography variant="body1" color="textSecondary.main">
            A platform for Users (researchers, analysts, innovators, students,
            and others who access sensitive data) and Organisations to create 
            profiles and share relevant information for Data Custodians to 
            assess if a person is ‘Safe’.
          </Typography>
        </StyledContainer>
        <StyledContainer>
          <Typography
            variant="h5"
            sx={{ marginBottom: "16px", fontWeight: "500" }}>
            Visibility across Data Custodians
          </Typography>
          <Typography variant="body1" color="textSecondary.main">
            Safe People Registry records Data Custodian approvals for previous
            and current projects as well as approvals for other functionality in
            complementary systems.
          </Typography>
        </StyledContainer>
        <StyledContainer>
          <Typography
            variant="h5"
            sx={{ marginBottom: "16px", fontWeight: "500" }}>
            Multiple authentication routes
          </Typography>
          <Typography variant="body1" color="textSecondary.main">
            Safe People Registry provides Single Sign-On (SSO) through multiple
            providers, such as; Google, LinkedIn and LSRI via Keycloak. This
            enables users to easily associate their Safe People Registry account
            with existing credentials.
          </Typography>
        </StyledContainer>
      </StyledFlex>
      <Typography variant="h4" color="primary">
        <a href={getRegisterUrl()}>Register for an account to get started</a> or{" "}
        <a href={getLoginUrl()}>sign in here</a>
      </Typography>
    </StyledContent>
  );
}
