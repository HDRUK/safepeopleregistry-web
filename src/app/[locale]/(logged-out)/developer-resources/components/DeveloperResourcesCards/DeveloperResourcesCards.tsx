"use client";

import { Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import {
  SiSwagger,
  SiOpenjdk,
  SiSharp,
  SiPython,
  SiGo,
  SiTypescript,
} from "react-icons/si";
import ActionCard from "@/components/ActionCard";
import { CardConfig, resolveHref } from "@/components/ActionCard/types";
import links from "@/consts/links";

const NAMESPACE_TRANSLATIONS = "DeveloperResources";
const ICON_SIZE = 34;

const CARDS: CardConfig[] = [
  {
    icon: <SiSwagger size={ICON_SIZE} />,
    titleKey: "apiDocTitle",
    descriptionKey: "apiDocDescription",
    ctaLabelKey: "apiDocButton",
    href: links.developerResources.apiDocumentation,
  },
  {
    icon: <SiOpenjdk size={ICON_SIZE} />,
    titleKey: "sdkJavaTitle",
    descriptionKey: "sdkJavaDescription",
    ctaLabelKey: "sdkButton",
    href: links.developerResources.sdkJava,
  },
  {
    icon: <SiSharp size={ICON_SIZE} />,
    titleKey: "sdkCSharpTitle",
    descriptionKey: "sdkCSharpDescription",
    ctaLabelKey: "sdkButton",
    href: links.developerResources.sdkCSharp,
  },
  {
    icon: <SiPython size={ICON_SIZE} />,
    titleKey: "sdkPythonTitle",
    descriptionKey: "sdkPythonDescription",
    ctaLabelKey: "sdkButton",
    href: links.developerResources.sdkPython,
  },
  {
    icon: <SiGo size={ICON_SIZE} />,
    titleKey: "sdkGoTitle",
    descriptionKey: "sdkGoDescription",
    ctaLabelKey: "sdkButton",
    href: links.developerResources.sdkGo,
  },
  {
    icon: <SiTypescript size={ICON_SIZE} />,
    titleKey: "sdkTypescriptTitle",
    descriptionKey: "sdkTypescriptDescription",
    ctaLabelKey: "sdkButton",
    href: links.developerResources.sdkTypescript,
  },
];

export default function DeveloperResourcesCards() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <Grid container spacing={2}>
      {CARDS.map(card => (
        <Grid
          key={card.titleKey}
          size={{ sm: 12, md: 4 }}
          sx={{ display: "flex" }}>
          <ActionCard
            icon={card.icon}
            title={t(card.titleKey)}
            description={t(card.descriptionKey ?? "")}
            href={resolveHref(card)}
            ctaLabel={t(card.ctaLabelKey ?? "sdkButton")}
          />
        </Grid>
      ))}
    </Grid>
  );
}
