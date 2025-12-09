"use client";

import Script from "next/script";

export const RegistryGlobals = ({
  version,
  features,
}: {
  version: string;
  features: object;
}) => {
  return (
    <Script id="hdr-globals" strategy="afterInteractive">
      {`
        window.RegistryGlobals = {
          features: ${JSON.stringify(features)},
          version: ${JSON.stringify(version)}
        };
      `}
    </Script>
  );
};
