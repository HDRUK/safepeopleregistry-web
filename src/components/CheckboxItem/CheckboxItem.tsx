import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Rule } from "@/types/rules";
import { useTranslations } from "next-intl";
import { ActionMenu, ActionMenuItem } from "../ActionMenu";
import FormControlCheckbox from "../FormControlCheckbox";
import {
  StyledListItem,
  StyledListItemText,
} from "../CheckboxList/CheckboxList.styles";
import AddEditCheckboxItem from "../AddEditCheckboxItem";

interface CheckboxItemProps {
  item: Rule;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit?: (updatedRule: Rule) => Promise<void>;
  heading: string;
}

const NAMESPACE_TRANSLATION = "CheckboxItem";

const CheckboxItem = ({
  item,
  checked,
  onChange,
  onEdit,
  heading,
}: CheckboxItemProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const [openModal, setOpenModal] = useState(false);

  return (
    <StyledListItem>
      <FormControlCheckbox
        id={item.id.toString()}
        name={`checkbox-${item.id}`}
        checked={checked}
        onChange={onChange}
        value={item.id}
        label={
          <StyledListItemText
            primary={item.label && <Typography>{item.label}:</Typography>}
            secondary={item.text}
          />
        }
      />

      {onEdit && (
        <ActionMenu sx={{ ml: "auto" }}>
          <ActionMenuItem
            sx={{ color: "secondary.main" }}
            onClick={() => setOpenModal(true)}>
            {t("edit")}
          </ActionMenuItem>
        </ActionMenu>
      )}

      {onEdit && (
        <AddEditCheckboxItem
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={onEdit}
          initialData={item}
          title={heading}
        />
      )}
    </StyledListItem>
  );
};

export default CheckboxItem;
