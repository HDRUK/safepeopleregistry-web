import { redirect } from "next/navigation";
import { useMemo, useTransition } from "react";

interface UseTransitionRedirectProps {
  path: string;
  enabled: boolean;
}

export default function useTransitionRedirect({
  path,
  enabled,
}: UseTransitionRedirectProps) {
  const [isRedirecting, startTransition] = useTransition();

  useMemo(() => {
    if (!isRedirecting && enabled && path) {
      startTransition(() => {
        redirect(path);
      });
    }
  }, [isRedirecting, enabled, path]);

  return isRedirecting;
}
