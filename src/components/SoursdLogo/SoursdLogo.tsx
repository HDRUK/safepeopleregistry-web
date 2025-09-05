import { BoxProps } from "@mui/system";
import { useTranslations } from "next-intl";
import Image from "next/image";
import logoDefault from "public/soursd_logo.svg";
import logoWhite from "public/soursd_logo_white.svg";
import { StyledLogoContainer, StyledLogoTitle } from "./SoursdLogo.styles";

const NAMESPACE_TRANSLATIONS = "SoursdLogo";

export interface SoursdLogoProps extends Omit<BoxProps, "color"> {
  color?: "default" | "white";
  variant?: "basic" | "titled";
  size?: number;
  direction?: "horizontal" | "vertical";
}

export default function SoursdLogo({
  variant = "basic",
  size = 65,
  color,
  direction,
  ...restProps
}: SoursdLogoProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  const logoColor = color === "white" ? logoWhite : logoDefault;
  const textColor = color === "white" ? "#fff" : "textSecondary.main";

  return (
    <StyledLogoContainer variant={variant} direction={direction} {...restProps}>
      <Image
        src={logoColor}
        alt="Safe People Registry"
        width={size}
        height={size}
        priority
      />
      {variant === "titled" && (
        <StyledLogoTitle sx={{ color: textColor }}>
          {t("logoTitle")}
        </StyledLogoTitle>
      )}
    </StyledLogoContainer>
  );
}
