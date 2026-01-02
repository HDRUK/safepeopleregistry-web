"use client";

import { Typography, Button } from "@mui/material";
import dataCustodianSupport from "public/images/homepage/DataCustodianSupport.png";
import organisationSupport from "public/images/homepage/OrganisationSupport.png";
import userSupport from "public/images/homepage/UserSupport.png";

import Image from "next/image";

import { StyledContent, StyledContainer, StyledFlex } from "./Support.styles";

export default function Support() {
  return (
    <StyledContent>
      <Typography variant="h3" sx={{ mb: "24px" }}>
        Support
      </Typography>
      <StyledFlex width="100%">
        <StyledContainer>
          <Image
            src={userSupport}
            alt="User support"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Button
            variant="outlined"
            href="/support#users"
            sx={{ padding: "16px", my: "12px", fontSize: "small" }}>
            Individual Users
          </Button>
        </StyledContainer>
        <StyledContainer>
          <Image
            src={organisationSupport}
            alt="Organisation support"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Button
            variant="outlined"
            href="/support#organisations"
            sx={{ padding: "16px", my: "12px", fontSize: "small" }}>
            Organisations
          </Button>
        </StyledContainer>
        <StyledContainer>
          <Image
            src={dataCustodianSupport}
            alt="Data Custodian support"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Button
            variant="outlined"
            href="/support#custodians"
            sx={{ padding: "16px", my: "12px", fontSize: "small" }}>
            Data Custodians
          </Button>
        </StyledContainer>
      </StyledFlex>
    </StyledContent>
  );
}
