import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  const defaultLocale = process.env.NEXT_INTL_DEFAULT_LOCALE || "en";
  const resolvedLocale = locale ?? defaultLocale;

  if (!locales[resolvedLocale]) notFound();

  return {
    messages: locales[resolvedLocale],
    locale: resolvedLocale,
  };
});
