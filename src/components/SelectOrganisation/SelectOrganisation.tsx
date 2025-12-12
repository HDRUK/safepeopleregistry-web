import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useOrganisationsQuery from "@/services/organisations/useOrganisationsQuery";

export interface SelectOrganisationProps {
  onChange?: (event: SelectChangeEvent) => void;
}

export default function SelectOrganisation({
  onChange,
  ...fieldProps
}: SelectOrganisationProps & SelectProps) {
  const [fieldValue, setFieldValue] = useState(fieldProps.value);
  const { data: organisationsData } = useOrganisationsQuery({
    defaultQueryParams: {
      perPage: 1000,
    },
  });

  const hydratedOrganisationMenu = useMemo(
    () =>
      (organisationsData ?? []).map(
        (org: { organisation_name: string; id: string }) => (
          <MenuItem value={org.id} key={org.id} id={org.organisation_name}>
            {org.organisation_name}
          </MenuItem>
        )
      ),
    [organisationsData]
  );

  const handleChange = (event: SelectChangeEvent) => {
    onChange?.(event);
  };

  useEffect(() => {
    setFieldValue(fieldProps.value);
  }, [fieldProps.value]);

  return (
    <Select onChange={e => handleChange(e)} {...fieldProps} value={fieldValue}>
      {hydratedOrganisationMenu}
    </Select>
  );
}
