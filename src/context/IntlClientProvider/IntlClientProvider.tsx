"use client";

import {
  AbstractIntlMessages,
  IntlErrorCode,
  NextIntlClientProvider,
} from "next-intl";
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
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  return (
    <NextIntlClientProvider
      timeZone={timeZone}
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
