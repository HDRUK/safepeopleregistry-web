import {
  Formats,
  RichTranslationValues,
  useTranslations as useTranslationsNextIntl,
} from "next-intl";
import { useMemo } from "react";

export default function useTranslations(translationNamespace: string) {
  const tNextIntl = useTranslationsNextIntl();

  const hasTranslations = (key: string) => {
    const qualifiedKey = `${translationNamespace}.${key}`;
    console.log(tNextIntl.raw(qualifiedKey));
    return tNextIntl.raw(qualifiedKey).startsWith(qualifiedKey);
  };

  const isService = (key: string) => {
    return /$(put|post|get|delete)[A-Z]/.test(key);
  };

  const getKey = (key: string) => {
    if (!hasTranslations(key)) {
      if (isService(key)) {
        return `Services.${key}`;
      }

      return `Application.${key}`;
    }

    return `${translationNamespace}.${key}`;
  };

  const t = (key: string) => {
    return tNextIntl(getKey(key));
  };

  t.rich = (
    key: string,
    values?: RichTranslationValues | undefined,
    formats?: Formats
  ) => {
    return tNextIntl.rich(getKey(key), values, formats);
  };

  return useMemo(
    () => ({
      t,
      hasTranslations,
    }),
    [translationNamespace]
  );
}
