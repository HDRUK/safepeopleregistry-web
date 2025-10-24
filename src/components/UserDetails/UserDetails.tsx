import { Box, BoxProps, Link, Typography } from "@mui/material";
import { getInitials, getName } from "../../utils/application";
import {
  Organisation,
  ProjectUser,
  ResearcherAffiliation,
  User,
} from "../../types/application";
import MaskLabel from "../MaskLabel";

export interface UserDetailsProps extends BoxProps {
  projectUser?: ProjectUser;
  user?: User;
  organisation?: Organisation;
  affiliation?: ResearcherAffiliation;
}

export default function UserDetails({
  projectUser,
  user: directUser,
  organisation: directOrganisation,
  affiliation,
  ...restProps
}: UserDetailsProps) {
  const user = directUser ?? projectUser?.registry?.user;
  const role = projectUser?.role;
  const organisation =
    directOrganisation ?? projectUser?.affiliation?.organisation;
  const orgAffiliationEmail = user?.registry?.affiliations?.find(
    aff => aff.organisation_id === organisation?.id
  )?.email;
  const email =
    projectUser?.affiliation?.email ?? orgAffiliationEmail ?? user?.email;

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      sx={{ pb: 2, gap: 3 }}
      {...restProps}>
      <MaskLabel
        initials={getInitials(getName(user))}
        size="large"
        sx={{
          justifyContent: "flex-start",
          flexGrow: 0,
          display: { xs: "none", sm: "inline-flex" },
        }}
      />
      <Box display="flex" flexDirection="column">
        <Typography variant="h2" sx={{ flexWrap: 1 }}>
          {getName(user)}
        </Typography>
        {role?.name && (
          <Typography sx={{ flexWrap: 1 }}>{role.name}</Typography>
        )}
        {organisation?.organisation_name && (
          <Typography sx={{ flexWrap: 1 }}>
            {organisation.organisation_name}
          </Typography>
        )}
        {email && (
          <Link href={`mailto:${email}`} sx={{ wordBreak: "break-all" }}>
            {email}
          </Link>
        )}
        {affiliation?.member_id && (
          <Typography sx={{ flexWrap: 1 }}>
            ID: {affiliation?.member_id}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
