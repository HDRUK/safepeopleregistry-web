"use client";

import AlertModal, { AlertModalProps } from "@/components/AlertModal";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

export const AlertModalContext = createContext<{
  hideAlert: () => void;
  showAlert: (props: Partial<AlertModalProps>) => void;
}>({
  showAlert: () => {},
  hideAlert: () => {},
});

export const useAlertModal = () => useContext(AlertModalContext);

export interface AlertModalProviderProps {
  children: ReactNode;
}

export default function AlertModalProvider({
  children,
}: AlertModalProviderProps) {
  const [alertModalProps, setAlertModalProps] = useState<
    Partial<AlertModalProps>
  >({
    open: false,
  });

  const value = useMemo(
    () => ({
      showAlert: (props: AlertModalProps) => {
        setAlertModalProps({
          ...props,
          open: true,
        });
      },
      hideAlert: () => {
        setAlertModalProps({
          open: false,
        });
      },
    }),
    []
  );

  return (
    <AlertModalContext.Provider value={value}>
      <AlertModal {...alertModalProps} />
      {children}
    </AlertModalContext.Provider>
  );
}
