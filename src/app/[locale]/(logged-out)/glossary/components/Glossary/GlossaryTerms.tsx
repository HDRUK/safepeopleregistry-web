"use client";

import { GlossaryContentProps } from "./Glossary.types";
import { Typography, Box } from "@mui/material";
import {
  termSectionStyles,
  termStyles,
  termContainerStyles,
} from "./Glossary.styles";

export default function GlossaryTerms({ glossaryTerms }: GlossaryContentProps) {
  return (
    <>
      {glossaryTerms.map(section => (
        <Box
          key={section.letter}
          id={`glossary-${section.letter}`}
          sx={termContainerStyles}>
          <Typography variant="h1">{section.letter}</Typography>
          {section.terms.map(item => (
            <Box key={item.term} sx={termSectionStyles}>
              <Typography sx={termStyles} variant="h6" component="h2">
                {item.term}
              </Typography>
              <Typography>{item.definition}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
}
