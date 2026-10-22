import { User } from "@/types/application";
import { getName } from "@/utils/application";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

interface DelegatePickerProps {
  id: string;
  delegates: User[];
  value: User | null;
  onChange: (delegate: User | null) => void;
}

export default function DelegatePicker({
  id,
  delegates,
  value,
  onChange,
}: DelegatePickerProps) {
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  return (
    <>
      <Typography
        component="label"
        htmlFor={id}
        sx={{ display: "block", mb: 1 }}>
        {tOrgProfile("sroInviteSelectDelegateLabel")}{" "}
        <span style={{ color: "red" }}>*</span>
      </Typography>
      <Autocomplete
        id={id}
        options={delegates}
        getOptionLabel={option => getName(option)}
        isOptionEqualToValue={(option, selected) => option.id === selected.id}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            required
            placeholder={tOrgProfile("sroInviteSelectDelegatePlaceholder")}
          />
        )}
      />
    </>
  );
}
