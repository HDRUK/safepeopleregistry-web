import { ReactNode } from "react";

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export interface Option {
  label: string;
  value: string;
  href?: string;
}

export type ModuleWithTranslations<T> = T & {
  t?: (key: string) => ReactNode;
};

export type TranslationsProps<T> = T & {
  t: (key: string) => string;
};
