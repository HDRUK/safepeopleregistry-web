"use client";

import { locales } from "@/config";
import {
  AbstractIntlMessages,
  IntlErrorCode,
  NextIntlClientProvider,
} from "next-intl";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

type IntlClientProviderProps = PropsWithChildren<{
  locale: string;
  messages?: AbstractIntlMessages;
}>;

export default function IntlClientProvider({
  children,
  locale,
  messages,
}: IntlClientProviderProps) {
  if (!locales[locale]) notFound();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      onError={error => {
        if (error.code === IntlErrorCode.MISSING_MESSAGE) {
          return;
        }

        console.error(error);
      }}>
      {children}
    </NextIntlClientProvider>
  );
}
