"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "@/data/store";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface BackButtonProps {
  label: string;
  fallback?: string;
  ignorePathSegment: string;
}

export default function BackToResultsButton({
  label,
  fallback,
  ignorePathSegment,
}: BackButtonProps) {
  const router = useRouter();

  const { history } = useStore(state => ({
    history: state.config.router.history,
  }));

  const [backHref, setBackHref] = useState<string | null>(null);

  useEffect(() => {
    let result = fallback ?? null;
    for (let i = history.length - 1; i >= 0; i--) {
      const path = history[i];
      if (!history[i].includes(ignorePathSegment)) {
        result = path;
        break;
      }
    }
    setBackHref(result);
  }, [ignorePathSegment, history, fallback]);

  // const backHref = useMemo(() => {
  //   let result = fallback ?? null;
  //   for (let i = history.length - 1; i >= 0; i--) {
  //     const path = history[i];
  //     if (!path[i].includes(ignorePathSegment)) {
  //       result = path;
  //       break;
  //     }
  //   }
  //   return result;
  // }, [history, ignorePathSegment, fallback]);

  if (!backHref) {
    return null;
  }

  const handleBack = () => {
    console.log("CLICKING - navigating to: ", backHref);
    router.push(backHref);
  };

  // const lockedBackHref = useRef<string | null>(null);

  // const backHref = useMemo(() => {
  //   if (lockedBackHref.current) {
  //     return lockedBackHref.current;
  //   }

  //   for (let i = history.length - 1; i >= 0; i--) {
  //     if (!history[i].includes(ignorePathSegment)) {
  //       lockedBackHref.current = history[i];
  //       return history[i];
  //     }
  //   }
  //   return fallback;
  // }, [history, fallback, ignorePathSegment]);

  // console.log("BackToResultsButton", { history, backHref, ignorePathSegment });

  // if (!backHref) {
  //   return null;
  // }

  // const handleBack = () => {
  //   console.log("BackToResultsButton handleBack", { backHref });
  //   router.push(backHref);
  // };
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
