import { Box, List, Typography } from "@mui/material";
import React, { useId } from "react";
import { HeadingLevel } from "@/consts/header";
import { Rule } from "../../types/rules";
import CheckboxItem from "../CheckboxItem";
import SkeletonCheckboxList from "./Skeleton";

interface CheckboxListType {
  items: Rule[];
  isLoading?: boolean;
  title: string;
  checked: boolean[];
  setChecked: (checked: boolean[]) => void;
  onEdit?: (updatedRule: Rule) => Promise<void>;
  onEditTitle?: string;
  rightButton?: React.ReactNode;
  headingComponent?: HeadingLevel;
}

const CheckboxList = ({
  isLoading = false,
  items,
  title,
  checked,
  setChecked,
  onEdit,
  onEditTitle,
  rightButton,
  headingComponent,
}: CheckboxListType) => {
  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = [...checked];
      newChecked[index] = event.target.checked;
      setChecked(newChecked);
    };
  const headingId = useId();

  return (
    <Box component="section" aria-describedby={headingId}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}>
        <Typography
          variant="h6"
          component={headingComponent ?? "h6"}
          id={headingId}>
          {title}
        </Typography>
        {rightButton && <Box>{rightButton}</Box>}
      </Box>
      <List sx={{ bgcolor: "#f2f2f2", padding: 1, borderRadius: 1 }}>
        {isLoading ? (
          <SkeletonCheckboxList isLoading={isLoading} n={items?.length || 4} />
        ) : (
          items.map((rule, index) => (
            <CheckboxItem
              key={rule.id}
              item={rule}
              checked={checked[index] || false}
              onChange={handleChange(index)}
              onEdit={onEdit}
              heading={onEditTitle || ""}
            />
          ))
        )}
      </List>
    </Box>
  );
};

export default React.memo(CheckboxList);
