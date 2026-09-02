import { Box, Typography } from "@mui/material";

export interface ClaimListProps {
  claims: Record<string, unknown> | null;
}

export default function ClaimList({ claims }: ClaimListProps) {
  if (!claims) return null;

  const entries = Object.entries(claims).filter(([, value]) => !!value);

  if (!entries.length) return null;

  return (
    <Box component="ul" sx={{ m: 0, pl: 2.5, mt: 1 }}>
      {entries.map(([key, value]) => (
        <Box component="li" key={key}>
          <Typography component="span" fontWeight={600}>
            {key}
          </Typography>
          {": "}
          {String(value)}
        </Box>
      ))}
    </Box>
  );
}
