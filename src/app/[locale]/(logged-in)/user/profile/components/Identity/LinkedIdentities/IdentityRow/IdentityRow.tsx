import { Box, Chip, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import ClaimList from "../ClaimList";

export interface IdentityRowProps {
  icon: ReactNode;
  title: string;
  description?: string;
  badgeText: string;
  badgeColor: "primary" | "success";
  claims?: Record<string, unknown> | null;
  action?: ReactNode;
}

export default function IdentityRow({
  icon,
  title,
  description,
  badgeText,
  badgeColor,
  claims,
  action,
}: IdentityRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: "grey.100",
      }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ pt: 0.5 }}>{icon}</Box>
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontWeight={600}>{title}</Typography>
            <Chip size="small" color={badgeColor} label={badgeText} />
          </Stack>
          {description && (
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          )}
          <ClaimList claims={claims ?? null} />
        </Box>
      </Box>
      {action}
    </Box>
  );
}
