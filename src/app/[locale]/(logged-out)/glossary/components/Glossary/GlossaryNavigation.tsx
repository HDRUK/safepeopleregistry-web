"use client";

import { GlossaryContentProps } from "./Glossary.types";
import { Typography, Link, Box } from "@mui/material";
import {
  highlightedLetterStyles,
  letterNavigationContainerStyles,
} from "./Glossary.styles";
import { useState } from "react";

const ALL_LETTERS = [
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

export default function GlossaryNavigation({
  glossaryTerms,
}: GlossaryContentProps) {
  const activeLetters = glossaryTerms.map(term => term.letter);

  const [selectedLetter, setSelectedLetter] = useState<string>("");

  return (
    <Box sx={letterNavigationContainerStyles}>
      {ALL_LETTERS.map(letter => {
        const isActive = activeLetters.includes(letter);
        const isSelected = selectedLetter === letter;
        return isActive ? (
          <Link
            key={letter}
            href={`#glossary-${letter}`}
            sx={highlightedLetterStyles}>
            <Typography
              onClick={() => setSelectedLetter(isSelected ? "" : letter)}
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
