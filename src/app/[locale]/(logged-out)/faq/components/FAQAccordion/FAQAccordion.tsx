"use client";

import AccordionTitle from "@/components/AccordionTitle";
import { PageColumnBody, PageColumnDetails, PageColumns } from "@/modules";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRef } from "react";
import { FAQSection } from "@/types/faq";

interface FAQAccordionProps {
  sectionSelectorTitle: string;
  sections: FAQSection[];
}

const FAQ_SELECT = "faq-section-select";
const FAQ_LABEL = "faq-section-label";

export default function FAQAccordion({
  sectionSelectorTitle,
  sections,
}: FAQAccordionProps) {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollTo = (id: string, offsetTop = 0) => {
    const el = sectionRefs.current[id];
    if (!el) return;

    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6, mt: 4 }}>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "white",
          borderRadius: 1,
          py: 2,
        }}>
        <FormControl fullWidth>
          <InputLabel id={FAQ_LABEL} htmlFor={FAQ_SELECT}>
            {sectionSelectorTitle}
          </InputLabel>
          <Select
            labelId={FAQ_LABEL}
            inputProps={{ id: FAQ_SELECT }}
            label={sectionSelectorTitle}
            defaultValue=""
            onChange={e => scrollTo(e.target.value as string, 80)}>
            {sections.map(section => (
              <MenuItem key={section.id} value={section.id}>
                {section.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <PageColumns component="section" sx={{ position: "relative" }}>
        <PageColumnBody
          size={{ xs: 12, sm: 4, lg: 2 }}
          sx={{
            display: { xs: "none", sm: "block" },
            position: "sticky",
            top: 16,
            alignSelf: "flex-start",
          }}
          component="aside">
          <Typography variant="h4" gutterBottom>
            {sectionSelectorTitle}
          </Typography>
          <RadioGroup onChange={(_, value) => scrollTo(value)}>
            {sections.map(section => (
              <FormControlLabel
                key={section.id}
                value={section.id}
                control={<Radio />}
                label={section.label}
              />
            ))}
          </RadioGroup>
        </PageColumnBody>

        <PageColumnDetails size={{ xs: 12, sm: 8, lg: 10 }}>
          {sections.map(section => {
            return (
              <Box
                key={section.id}
                component="section"
                id={section.id}
                sx={{ mb: 5 }}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[section.id] = el;
                }}>
                <Typography variant="h2" sx={{ mb: 4 }}>
                  {section.label}
                </Typography>

                {section.questions.map(q => (
                  <Accordion key={q.id}>
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon sx={{ color: "primary.main" }} />
                      }>
                      <AccordionTitle actions={undefined}>
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{ color: "primary.main" }}>
                          {q.question}
                        </Typography>
                      </AccordionTitle>
                    </AccordionSummary>
                    <AccordionDetails>
                      {q.answer.map((text, i, arr) => (
                        <Typography
                          key={i}
                          sx={{ mb: i < arr.length - 1 ? 3 : 0 }}>
                          {text}
                        </Typography>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            );
          })}
        </PageColumnDetails>
      </PageColumns>
    </Box>
  );
}
