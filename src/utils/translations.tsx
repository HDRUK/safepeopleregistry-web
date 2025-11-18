import ContactLink from "@/components/ContactLink";
import { useTranslations } from "next-intl";
import ReactDOMServer from "react-dom/server";

const renderErrorToString = (
  t: ReturnType<typeof useTranslations>,
  key: string
) => {
  return ReactDOMServer.renderToString(
    t.rich(key, {
      contactLink: ContactLink,
    })
  );
};

function getTranslationWithFallback(
  t: ReturnType<typeof useTranslations>,
  key: string,
  fallback?: string
) {
  try {
    const value = t(key);

    if (value.includes(key)) {
      return fallback || null;
    }

    return value;
  } catch (_) {
    return fallback || null;
  }
}

export { renderErrorToString, getTranslationWithFallback };
