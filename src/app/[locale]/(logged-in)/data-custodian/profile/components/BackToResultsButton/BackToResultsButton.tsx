"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/data/store";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface BackButtonProps {
  label: string;
  fallback?: string;
  ignorePathSegment?: string;
  fixedHref?: string;
}

export default function BackToResultsButton({
  label,
  fallback,
  ignorePathSegment,
  fixedHref,
}: BackButtonProps) {
  const router = useRouter();

  const { history } = useStore(state => ({
    history: state.config.router.history,
  }));

  const [backHref, setBackHref] = useState<string | null>(null);

  useEffect(() => {
    if (fixedHref) {
      setBackHref(fixedHref);
      return;
    }

    let result = fallback ?? null;
    for (let i = history.length - 1; i >= 0; i--) {
      const path = history[i];
      if (!ignorePathSegment || !path.includes(ignorePathSegment)) {
        result = path;
        break;
      }
    }
    setBackHref(result);
  }, [fixedHref, ignorePathSegment, history, fallback]);

  if (!backHref) {
    return null;
  }

  const handleBack = () => {
    router.push(backHref);
  };

  return (
    <>
      <Box
        onClick={handleBack}
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          cursor: "pointer",
          color: "primary.main",
          textDecoration: "underline",
        }}>
        <ArrowBackIcon />
        <Typography sx={{ ml: 1, textDecoration: "underline" }}>
          {label}
        </Typography>
      </Box>
    </>
  );
}
