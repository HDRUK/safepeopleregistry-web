import { styledContainer } from "@/app/[locale]/components/Support/Support.styles";
import { Box, Typography, TypographyProps } from "@mui/material";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import Image from "next/image";

interface SupportItem {
  title: string;
  body: string;
}
interface SupportCardProps {
  src: StaticImageData;
  alt: string;
  title: string;
  info: ReactNode;
  headingSize?: TypographyProps["variant"];
  subTitle?: string;
  listItems?: SupportItem[];
}

export default function SupportCard({
  src,
  alt,
  title,
  info,
  subTitle,
  headingSize = "h4",
  listItems,
}: SupportCardProps) {
  return (
    <Box sx={styledContainer} component="article">
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ width: "100%", height: "auto" }}
      />
      <Typography
        variant={headingSize}
        sx={{ my: 3, mb: 1.5 }}
        color="textPrimary"
        component="p">
        {title}
      </Typography>
      {subTitle && (
        <Typography
          variant={"h6"}
          component="p"
          sx={{ mb: 1.5 }}
          color="textPrimary">
          {subTitle}
        </Typography>
      )}
      <Typography color="textPrimary" sx={{ mb: 1 }}>
        {info}
      </Typography>
      {listItems && (
        <Box component="ul">
          {listItems.map(item => (
            <Box component="li" key={item.title} sx={{ mb: 2 }}>
              <Typography component="span" fontWeight={600}>
                {item.title}
              </Typography>
              {": "}
              {item.body}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
