import { ReactNode } from "react";

export interface GlossaryTerm {
  term: string;
  definition: string | ReactNode;
}

export interface GlossarySection {
  letter: string;
  terms: GlossaryTerm[];
}

export interface GlossaryContentProps {
  glossaryTerms: GlossarySection[];
}
