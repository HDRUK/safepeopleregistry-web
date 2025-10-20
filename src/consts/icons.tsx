import Add from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import StarIcon from "@mui/icons-material/Star";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { SvgIconProps } from "@mui/material";
import { yellow } from "@mui/material/colors";

const VerifyIcon = (props: SvgIconProps) => {
  const { sx, ...restProps } = props;

  return (
    <VerifiedUserOutlinedIcon
      {...restProps}
      sx={{ color: "primary.main", ...sx }}
    />
  );
};

const RejectIcon = (props: SvgIconProps) => {
  const { sx, ...restProps } = props;

  return (
    <GppBadOutlinedIcon {...restProps} sx={{ color: "primary.main", ...sx }} />
  );
};

const AddIcon = (props: SvgIconProps) => {
  return <Add {...props} />;
};

const TrashIcon = (props: SvgIconProps) => (
  <DeleteIcon {...props} sx={{ color: "error.main" }} />
);

const EditIcon = (props: SvgIconProps) => (
  <ModeEditIcon {...props} sx={{ color: "default.main" }} />
);

const OrganisationIcon = (props: SvgIconProps) => <BusinessIcon {...props} />;

const FilterIcon = (props: SvgIconProps) => <FilterAltIcon {...props} />;

const PrimaryContactIcon = (props: SvgIconProps) => (
  <StarIcon
    sx={{ color: yellow["700"] }}
    {...props}
    data-cy="icon-primary-contact"
  />
);

export {
  AddIcon,
  EditIcon,
  FilterIcon,
  OrganisationIcon,
  PrimaryContactIcon,
  RejectIcon,
  TrashIcon,
  VerifyIcon,
};
