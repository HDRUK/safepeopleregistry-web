import { Status } from "@/consts/application";
import { Box, Paper, PaperProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import { getInitials } from "../../utils/application";
import ChipStatus from "../ChipStatus";
import MaskLabel from "../MaskLabel";
import Text from "../Text";

export interface SoursdCardProps extends PaperProps {
  name: string;
  identifier: string;
  status?: Status;
  description?: ReactNode;
}

export default function SoursdCard({
  children,
  elevation = 0,
  name,
  status,
  identifier,
  sx,
  description,
  ...restProps
}: SoursdCardProps) {
  return (
    <Paper
      elevation={elevation}
      sx={{
        p: 3,
        wordBreak: "break-word",
        border: "1px solid",
        borderColor: "muiBorder",
        ...sx,
      }}
      {...restProps}>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <div>
          <MaskLabel initials={getInitials(name)} size="large" />
        </div>
        <div>
          <Typography variant="h3" mb={1} mt={2}>
            {name}
          </Typography>
          {status && <ChipStatus status={status} />}
        </div>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div>
          <Typography fontWeight={700}>
            Safe People Registry identifier:
          </Typography>
          <Text copyable>{identifier}</Text>
        </div>
        {children}
        <Typography color="textSecondary.main">{description}</Typography>
      </Box>
    </Paper>
  );
}
