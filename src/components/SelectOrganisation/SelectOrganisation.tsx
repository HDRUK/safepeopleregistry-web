import { PAGINATION_UPPER_LIMIT } from "@/consts/application";
import useOrganisationsQuery from "@/services/organisations/useOrganisationsQuery";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { useMemo } from "react";

export interface SelectOrganisationProps {
  onChange?: (event: SelectChangeEvent) => void;
  hasEmpty?: boolean;
}

export default function SelectOrganisation({
  onChange,
  hasEmpty,
  ...fieldProps
}: SelectOrganisationProps & SelectProps) {
  const { data: organisationsData } = useOrganisationsQuery({
    defaultQueryParams: {
      per_page: PAGINATION_UPPER_LIMIT,
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

  return (
    <Select onChange={e => handleChange(e)} {...fieldProps}>
      {hasEmpty && <MenuItem value={null} />}
      {hydratedOrganisationMenu}
    </Select>
  );
}
