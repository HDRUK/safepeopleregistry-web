import { PAGINATION_UPPER_LIMIT } from "@/consts/application";
import useOrganisationsQuery from "@/services/organisations/useOrganisationsQuery";
import { EntityType } from "@/types/api";
import { Organisation } from "@/types/application";
import { filterOrganisationsList } from "@/utils/organisation";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

export interface SelectOrganisationProps {
  onChange?: (event: SelectChangeEvent) => void;
  hasEmpty?: boolean;
  entityType: EntityType;
  entityId: number;
  showNotApprovedText?: boolean;
}

export default function SelectOrganisation({
  onChange,
  hasEmpty,
  entityType,
  entityId,
  showNotApprovedText,
  ...fieldProps
}: SelectOrganisationProps & SelectProps) {
  const { data: organisationsData } = useOrganisationsQuery({
    defaultQueryParams: {
      per_page: PAGINATION_UPPER_LIMIT,
    },
  });

  const hydratedOrganisationMenu = useMemo(
    () =>
      (organisationsData ?? [])
        .filter(
          (org: Organisation) =>
            org.system_approved ||
            filterOrganisationsList(org, entityType, entityId)
        )
        .map((org: Organisation) => (
          <MenuItem value={org.id} key={org.id} id={org.organisation_name}>
            <div>
              <Typography>{org.organisation_name}</Typography>
              {showNotApprovedText && !org.system_approved && (
                <Typography variant="caption">
                  Pending approval by HDR UK
                </Typography>
              )}
            </div>
          </MenuItem>
        )),
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
