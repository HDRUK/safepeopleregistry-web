import packageJson from "@/../package.json";
import { FeatureProvider } from "@/components/FeatureProvider";
import { BannerLists } from "@/components/Message";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import { RegistryGlobals } from "@/components/RegistryGlobals";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { locales } from "@/config";
import IntlClientProvider from "@/context/IntlClientProvider";
import {
  isChristmasBannerEnabled,
  isSponsorship,
  isTestFeatureEnabled,
  isTestFeatureUserAdmin,
} from "@/flags";
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
import "../global.css";
import "../sweetalert2-custom.css";
import IntlClientProvider from "@/context/IntlClientProvider";
import { isTestFeatureEnabled, isTestFeatureUserAdmin } from "@/flags";
import { FeatureProvider } from "@/components/FeatureProvider";
import packageJson from "@/../package.json";
import { RegistryGlobals } from "@/components/RegistryGlobals";
import { BannerLists } from "@/components/Message";

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
  const { version } = packageJson;

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const features = {
    isTestFeatureEnabled: (await isTestFeatureEnabled()) as boolean,
    isTestFeatureUserAdmin: (await isTestFeatureUserAdmin()) as boolean,
    // isChristmasBannerEnabled: (await isChristmasBannerEnabled()) as boolean,
    isChristmasBannerEnabled: true,
  };

  // below boolean will grow as we get more banners.. i know this is a pointless const for now...
  const displayBanner = features.isChristmasBannerEnabled;

  const enabledBanners: BannerLists = {
    christmasMessage: features.isChristmasBannerEnabled,
  };

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
                <FeatureProvider features={features}>
                  <GlobalStyles
                    styles={{
                      [".MuiGrid-item .MuiGrid-container"]: {
                        maxWidth: "initial",
                      },
                    }}
                  />
                  {displayBanner && (
                    <BannerMessage enabledBanners={enabledBanners} />
                  )}
                  {children}
                </FeatureProvider>
              </ThemeRegistry>
            </ReactQueryClientProvider>
          </AppRouterCacheProvider>
        </IntlClientProvider>
      </Box>
      <RegistryGlobals version={version} features={features} />
    </html>
  );
}
