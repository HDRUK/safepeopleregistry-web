"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";
import SearchField from "../SearchField";

export interface SearchBarProps {
  onSearch: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  legend?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
}

export default function SearchBar({
  placeholder,
  legend,
  onSearch,
  onClear,
  children,
  disabled,
}: SearchBarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flexGrow: 1,
      }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: {
            md: "row",
            xs: "column",
          },
        }}>
        <SearchField
          disabled={disabled}
          onSearch={(text: string) => {
            if (!text || text.length < 1) {
              onClear?.();
              return;
            }
            onSearch(text);
          }}
          onClear={onClear}
          placeholder={placeholder}
          sx={{ flexGrow: 1, minWidth: "10%", width: "50%", maxWidth: "70%" }}
        />
        {children}
      </Box>
      {legend}
    </Box>
  );
}
