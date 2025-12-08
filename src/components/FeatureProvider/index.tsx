"use client";

import { useContext, createContext, ReactNode, useMemo } from "react";

const FeatureContext = createContext("features");

export interface FeatureType {
  [key: string]: boolean;
}

interface ProviderProps {
  children: ReactNode;
  features: FeatureType;
}
function FeatureProvider({ children, features }: Readonly<ProviderProps>) {
  const value = useMemo(() => features, [features]);
  return (
    <FeatureContext.Provider value={value as unknown as string}>
      {children}
    </FeatureContext.Provider>
  );
}

function useFeatures(): FeatureType {
  return useContext(FeatureContext) as unknown as FeatureType;
}

export { FeatureProvider, useFeatures };
