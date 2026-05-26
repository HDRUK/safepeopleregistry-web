import { ReactNode } from "react";

export interface FAQSectionConfig {
  id: string;
  labelKey: string;
  questions: string[];
}

export interface FAQSection {
  id: string;
  label: string;
  questions: {
    id: string;
    question: string;
    answer: ReactNode[];
  }[];
}
