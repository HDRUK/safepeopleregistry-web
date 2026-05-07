import { styledContainer } from "@/app/[locale]/components/Support/Support.styles";
import { Box, Typography } from "@mui/material";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import Image from "next/image";

interface SupportCardProps {
  src: StaticImageData;
  alt: string;
  title: string;
  info: ReactNode;
}

export default function SupportCard({
  src,
  alt,
  title,
  info,
}: SupportCardProps) {
  return (
    <Box sx={styledContainer}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ width: "100%", height: "auto" }}
      />
      <Typography variant="h4" sx={{ my: 3, mb: 1.5 }} color="textPrimary">
        {title}
      </Typography>
      <Typography color="textSecondary">{info}</Typography>
    </Box>
  );
}
