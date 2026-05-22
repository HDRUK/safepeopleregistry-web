"use client";

import { Typography, Link, Box } from "@mui/material";
import {
  HighlightedLetterStyles,
  LetterNavigationContainerStyles,
} from "./Glossary.styles";
import { useState } from "react";
import { GlossaryContentProps } from "./Glossary.types";

const allLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function GlossaryContent({
  glossaryTerms,
}: GlossaryContentProps) {
  const activeLetters = glossaryTerms.map(term => term.letter);

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  return (
    <Box sx={LetterNavigationContainerStyles}>
      {allLetters.map(letter => {
        const isActive = activeLetters.includes(letter);
        const isSelected = selectedLetter === letter;
        return isActive ? (
          <Link
            key={letter}
            href={`#glossary-${letter}`}
            sx={{ HighlightedLetterStyles }}>
            <Typography
              onClick={() => setSelectedLetter(isSelected ? null : letter)}
              variant="h2">
              {letter}
            </Typography>
          </Link>
        ) : (
          <Typography key={letter} variant="h2">
            {letter}
          </Typography>
        );
      })}
    </Box>
  );
}
