import { Box } from "@mui/material";
import { ReactNode } from "react";
import { mockedProfileGuidance } from "@/mocks/data/cms";
import Guidance, { GuidanceProps } from "../../components/Guidance";
import { HeadingLevel } from "@/consts/header";

interface PageGuidanceProps extends GuidanceProps {
  profile?: string;
  tabId?: string;
  subTabId?: string;
  subTabs?: ReactNode;
  children: ReactNode;
}

export default function PageGuidance({
  subTabs,
  children,
  profile,
  tabId,
  subTabId,
  ...restProps
}: PageGuidanceProps) {
  let guidanceProps = {
    ...restProps,
  };

  if (profile && tabId && subTabId) {
    guidanceProps = {
      ...guidanceProps,
      ...mockedProfileGuidance?.[profile]?.[tabId]?.[subTabId],
    };
  }

  return (
    <Guidance {...guidanceProps} headingComponent={HeadingLevel.H2}>
      {subTabs}
      <Box {...restProps} sx={{ pl: 0 }}>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </Guidance>
  );
}
