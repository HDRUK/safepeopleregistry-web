import LoadingWrapper from "@/components/LoadingWrapper";
import { PropsWithChildren, Suspense } from "react";

type LayoutProps = PropsWithChildren;

export default async function Layout({ children }: LayoutProps) {
  return (
    <Suspense fallback={<LoadingWrapper loading variant="basic" />}>
      {children}
    </Suspense>
  );
}
