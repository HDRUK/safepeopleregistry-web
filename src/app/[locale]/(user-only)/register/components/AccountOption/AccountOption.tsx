"use client";

import React, { ReactNode } from "react";
import { Button, Typography } from "@mui/material";
import { UserGroup } from "@/consts/user";

interface AccountOptionProps {
  icon: React.ElementType;
  label: ReactNode;
  onClick: (name: UserGroup) => void;
  name: UserGroup;
  selected: UserGroup | null;
  disabled?: boolean;
}

const AccountOption: React.FC<AccountOptionProps> = ({
  icon,
  label,
  onClick,
  name,
  selected,
  disabled = false,
}) => {
  const Icon = icon;
  return (
    <Button
      variant="outlined"
      onClick={() => onClick(name)}
      disabled={disabled}
      sx={{
        borderRadius: 2,
        border: 2,
        py: 2,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        aspectRatio: 1,
        width: 166,
        borderColor: selected === name && "primary.main",
        borderWidth: selected === name ? 3 : 2,
        color: "textPrimary.main",
        "&:hover": {
          borderWidth: 3,
        },
      }}>
      <Icon sx={{ fontSize: 48 }} />
      <Typography>{label}</Typography>
    </Button>
  );
};

export default AccountOption;
