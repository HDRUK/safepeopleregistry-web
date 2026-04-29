"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__?: QueryClient;
  }
}

interface ReactQueryClientProviderProps {
  children: ReactNode;
}

export default function ReactQueryClientProvider({
  children,
}: ReactQueryClientProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    window.__TANSTACK_QUERY_CLIENT__ = queryClient;

    return () => {
      delete window.__TANSTACK_QUERY_CLIENT__;
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
