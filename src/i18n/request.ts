import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  const defaultLocale = process.env.NEXT_INTL_DEFAULT_LOCALE || "en";
  const resolvedLocale = locale ?? defaultLocale;

  const localePath = `../../messages/${resolvedLocale}.json`;

  return {
    messages: (await import(localePath)).default,
    locale: resolvedLocale,
  };
});
