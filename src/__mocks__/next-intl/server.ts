import messages from "@/config/locales/en.json";
import { createTranslator } from "use-intl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTranslations = async (namespace?: any) =>
  createTranslator({ locale: "en", messages, namespace });
