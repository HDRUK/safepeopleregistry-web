"use client";

import { Collapse, useTheme } from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";
import { ReactNode, useState } from "react";
import Markdown from "@/components/Markdown";
import { Position } from "../../consts/ui";
import { StyledGuidance, StyledInfo } from "./Guidance.styles";
import GuidanceTitle from "./GuidanceTitle";
import GuidanceTrigger from "./GuidanceTrigger";

export interface GuidanceProps {
  children: ReactNode;
  info: ReactNode;
  infoTitle: ReactNode;
  infoWidth?: number | string;
  infoTitleIcon?: ReactNode;
  defaultExpanded?: boolean;
  hasGuidance?: boolean;
}

export default function Guidance({
  children,
  info,
  infoTitleIcon,
  infoWidth = "400px",
  defaultExpanded = true,
  infoTitle,
  hasGuidance = true,
}: GuidanceProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StyledGuidance positionVertical={isMdDown}>
      <Box sx={{ pr: hasGuidance ? 4 : 0, flexGrow: 1 }}>{children}</Box>
      {hasGuidance && (
        <Box
          sx={{
            width: `${isMdDown ? "100%" : "auto"}`,
          }}>
          <Collapse
            id="info"
            component="section"
            key={`mdDown_${isMdDown}`}
            in={expanded}
            collapsedSize="45px"
            orientation={isMdDown ? "vertical" : "horizontal"}
            sx={{
              p: isMdDown ? "20px 0 0 0" : "0 0 0 20px",
              height: "100%",
            }}>
            <StyledInfo positionVertical={isMdDown} infoWidth={infoWidth}>
              <GuidanceTrigger
                aria-controls="info"
                onClick={() => setExpanded(!expanded)}
                expanded={expanded}
                position={isMdDown ? Position.BOTTOM : Position.RIGHT}
              />

              <GuidanceTitle infoTitleIcon={infoTitleIcon}>
                {infoTitle}
              </GuidanceTitle>
              <Box sx={{ overflowY: "auto" }}>
                {typeof info === "string" ? <Markdown>{info}</Markdown> : info}
              </Box>
            </StyledInfo>
          </Collapse>
        </Box>
      )}
    </StyledGuidance>
  );
}
