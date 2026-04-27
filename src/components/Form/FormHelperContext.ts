"use client";

import { createContext, useContext } from "react";

type FormHelper = {
  isFieldRequired: (name: string) => boolean;
};

export const FormHelperContext = createContext<FormHelper | null>(null);

export const useFormHelper = () => {
  const ctx = useContext(FormHelperContext);
  if (!ctx) throw new Error("Missing FormHelperContext");
  return ctx;
};
