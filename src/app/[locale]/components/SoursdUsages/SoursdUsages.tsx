"use client";

import { Box, Typography } from "@mui/material";
import { mockedSoursdHomepageUsages } from "@/mocks/data/cms";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { framerFadeIn } from "@/utils/framer";
import {
  StyledOuterContent,
  StyledContent,
  StyledContainer,
  StyledFlex,
  StyledBox,
} from "./SoursdUsages.styles";

export default function SoursdUsages() {
  return (
    <StyledOuterContent>
      <StyledContainer>
        <StyledContent>
          {mockedSoursdHomepageUsages.infoHeader}
          <StyledFlex>
            <StyledBox
              {...framerFadeIn}
              transition={{ ...framerFadeIn.transition, delay: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                }}>
                <TrendingUpIcon color="white" style={{ fontSize: "70px" }} />
                <Typography
                  variant="h4"
                  align="center"
                  sx={{
                    fontWeight: "500",
                    marginLeft: "24px",
                    textAlign: "left",
                  }}>
                  Accelerate ‘Safe People’ data access
                </Typography>
              </Box>
            </StyledBox>
            <StyledBox
              {...framerFadeIn}
              transition={{ ...framerFadeIn.transition, delay: 0.5 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                }}>
                <FastForwardOutlinedIcon
                  color="white"
                  style={{ fontSize: "70px" }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "500",
                    marginLeft: "24px",
                    textAlign: "left",
                  }}>
                  Reduce duplication of effort for Users and Organisations
                </Typography>
              </Box>
            </StyledBox>
            <StyledBox
              {...framerFadeIn}
              transition={{ ...framerFadeIn.transition, delay: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                }}>
                <GppGoodOutlinedIcon
                  color="white"
                  style={{ fontSize: "70px" }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "500",
                    marginLeft: "24px",
                    textAlign: "left",
                  }}>
                  Enable shared intelligence across Data Custodians
                </Typography>
              </Box>
            </StyledBox>
          </StyledFlex>
        </StyledContent>
      </StyledContainer>
    </StyledOuterContent>
  );
}
