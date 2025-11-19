import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { locales } from "@/config";
import ToastProvider from "@/context/ToastProvider";
import BannerMessage from "@/modules/BannerMessage";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Box } from "@mui/system";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import "../sweetalert2-custom.css";
import "../global.css";
import IntlClientProvider from "@/context/IntlClientProvider";

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
      <Box
        component="body"
        className={inter.className}
        sx={{ background: "#f2f2f2" }}>
        <IntlClientProvider locale={locale} messages={messages}>
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
        </IntlClientProvider>
      </Box>
    </html>
  );
}
