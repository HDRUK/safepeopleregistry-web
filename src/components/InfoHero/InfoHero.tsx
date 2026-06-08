import { Link } from "@/i18n/routing";
import links from "@/consts/links";
import { ROUTES } from "@/consts/router";
import theme from "@/theme";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { getTranslations } from "next-intl/server";

export interface InfoHeroProps {
  translationPath: string;
}

export default async function InfoHero({ translationPath }: InfoHeroProps) {
  const t = await getTranslations(translationPath);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        padding: 3,
        gap: 6,
        alignSelf: "stretch",
        borderRadius: 3,
        background: theme.palette["neutral-50"].main,
      }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Typography variant="h2" component="span" sx={{ fontWeight: 400 }}>
            {t.rich("title", {
              bold: chunks => <strong>{chunks}</strong>,
            })}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Typography
            sx={{
              "& a": {
                color: "primary.main",
              },
            }}>
            {t.rich("content", {
              techLink: chunks => (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={links.common.techTeam}>
                  {chunks}
                </Link>
              ),
              helpLink: chunks => (
                <Link href={ROUTES.getInvolved.path}>{chunks}</Link>
              ),
            })}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
