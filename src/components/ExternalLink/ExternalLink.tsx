"use client";

import { Box, Link, LinkProps } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useTranslations } from "next-intl";

type ExternalLinkProps = Omit<LinkProps, "target" | "rel"> & {
  href: string;
};

export default function ExternalLink({
  href,
  children,
  ...props
}: ExternalLinkProps) {
  const t = useTranslations("Common");

  return (
    <Link href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
      <Box component="span" sx={visuallyHidden}>
        {t("opensInNewTab")}
      </Box>
    </Link>
  );
}
