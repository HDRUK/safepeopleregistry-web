import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./config";

export default getRequestConfig(async ({ requestLocale = "en" }) => {
  const locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (locale && !locales[locale]) notFound();

  return {
    messages: locales[locale],
    locale,
  };
});
