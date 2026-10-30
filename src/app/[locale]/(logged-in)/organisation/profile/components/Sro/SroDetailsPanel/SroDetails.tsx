import { User } from "@/types/application";
import { Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

interface SroDetailsProps {
  sro: User;
  // An invited SRO has not filled in their profile yet, so has no department or job title.
  showProfile?: boolean;
}

export default function SroDetails({
  sro,
  showProfile = true,
}: SroDetailsProps) {
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  return (
    <Grid container rowSpacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          {tOrgProfile("sroAssignedName")}
        </Typography>
        <Typography>
          {sro.first_name} {sro.last_name}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          {tOrgProfile("sroAssignedEmail")}
        </Typography>
        <Typography>{sro.email || "-"}</Typography>
      </Grid>
      {showProfile && (
        <>
          <Grid size={{ xs: 12 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {tOrgProfile("sroAssignedDepartment")}
            </Typography>
            <Typography>{sro.departments?.[0]?.name || "-"}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {tOrgProfile("sroAssignedJobTitle")}
            </Typography>
            <Typography>{sro.role || "-"}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}
