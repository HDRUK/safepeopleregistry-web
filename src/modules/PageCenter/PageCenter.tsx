import { Box } from "@mui/material";
import { ReactNode } from "react";

interface PageCenterProps {
  children: ReactNode;
}

function PageCenter({ children }: PageCenterProps) {
  return (
    <Box
      sx={{
        maxWidth: "1536px",
        margin: "0 auto",
        padding: "0 20px",
        width: "100%",
        flexGrow: 1,
      }}>
      {children}
    </Box>
  );
}

export default PageCenter;
