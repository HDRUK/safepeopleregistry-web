import { Box } from "@mui/system";
import { PropsWithChildren } from "react";

type AlertModalIconOutlineProps = PropsWithChildren<{
  severity: "error" | "warning" | "info" | "success";
}>;

export default function AlertModalIconOutline({
  severity,
  children,
}: AlertModalIconOutlineProps) {
  return (
    <Box
      sx={{
        borderRadius: "50%",
        borderColor: `${severity}.main`,
        borderWidth: "8px",
        borderStyle: "solid",
        width: 83,
        height: 83,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {children}
    </Box>
  );
}
