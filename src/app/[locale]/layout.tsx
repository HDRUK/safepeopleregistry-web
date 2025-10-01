import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { locales } from "@/config";
import ToastProvider from "@/context/ToastProvider";
import BannerMessage from "@/modules/BannerMessage";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Box } from "@mui/system";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import "../global.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { getMessages } from "next-intl/server";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safe People Registry",
  description: "Safe People Registry homepage",
};

type RootLayoutProps = PropsWithChildren<{
  params: { locale: string };
}>;

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  if (!locales[locale]) notFound();

  const messages = await getMessages();

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang={locale}>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <head>
        <link rel="stylesheet" href="/css/sweetalert2-custom.css" />
      </head>
      <Box
        component="body"
        className={inter.className}
        sx={{ background: "#f2f2f2" }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ReactQueryClientProvider>
              <ThemeRegistry>
                <ToastProvider>
                  <GlobalStyles
                    styles={{
                      [".MuiGrid-item .MuiGrid-container"]: {
                        maxWidth: "initial",
                      },
                    }}
                  />
                  {process.env.NEXT_PUBLIC_HIDE_BANNER !== "true" && (
                    <BannerMessage />
                  )}
                  {children}
                </ToastProvider>
              </ThemeRegistry>
            </ReactQueryClientProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </Box>
    </html>
  );
}
