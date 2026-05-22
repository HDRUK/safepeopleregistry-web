"use client";
import { Typography, Box } from "@mui/material";
import {
  TermSectionStyles,
  TermStyles,
  DefinitionStyles,
  TermContainerStyles,
} from "./Glossary.styles";
import { GlossaryContentProps } from "./Glossary.types";

export default function GlossaryTerms({ glossaryTerms }: GlossaryContentProps) {
  return (
    <>
      {glossaryTerms.map(section => (
        <Box
          key={section.letter}
          id={`glossary-${section.letter}`}
          sx={TermContainerStyles}>
          <Typography variant="h1">{section.letter}</Typography>
          {section.terms.map(item => (
            <Box key={item.term} sx={TermSectionStyles}>
              <Typography sx={TermStyles} variant="h6">
                {item.term}
              </Typography>
              <Typography sx={DefinitionStyles}>{item.definition}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
}
