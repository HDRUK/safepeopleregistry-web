import { Link } from "@/i18n/routing";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTranslations } from "next-intl/server";

export interface InfoHeroProps {
  translationPath: string;
}

const TECH_HREF = "https://healthdatagateway.org/en/about/meet-the-team";
const HELP_HREF = "#";

export default async function InfoHero({ translationPath }: InfoHeroProps) {
  const t = await getTranslations(translationPath);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        padding: 3,
        mb: 6,
        gap: 6,
        alignSelf: "stretch",
        borderRadius: 3,
        background: "#F1F1F1",
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
                <Link target="_blank" rel="noreferrer" href={TECH_HREF}>
                  {chunks}
                </Link>
              ),
              helpLink: chunks => <Link href={HELP_HREF}>{chunks}</Link>,
            })}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
