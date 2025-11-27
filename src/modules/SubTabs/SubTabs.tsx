"use client";

import { Tabs, Tab, TabsProps } from "@mui/material";
import { Link } from "@/i18n/routing";
import { Option } from "../../types/common";

interface SubTabsProps extends TabsProps {
  current: string | null;
  tabs: Option[];
}

export default function SubTabs({
  tabs,
  current,
  sx,
  ...restProps
}: SubTabsProps) {
  const [firstTab] = tabs;
  const defaultValue = firstTab.value;

  return (
    <Tabs data-cy="sub-tabs-navigation"
      value={current || defaultValue}
      {...restProps}
      variant="fullWidth"
      sx={{ mb: 1, ...sx }}>
      {tabs.map(({ label, value, href }) => (
        <Tab
          label={label}
          value={value}
          href={href}
          component={Link}
          iconPosition="start"
          sx={{ fontWeight: 400, fontSize: "14px", mb: 2 }}
        />
      ))}
    </Tabs>
  );
}
