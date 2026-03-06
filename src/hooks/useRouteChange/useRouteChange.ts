import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

interface UseRouteChangeProps {
  canLeave?: boolean;
  isSubmitting?: boolean;
  onBlocked: (pathname: string | null, isSubmitting: boolean) => void;
}

export default function useRouteChange({
  canLeave,
  isSubmitting = false,
  onBlocked,
}: UseRouteChangeProps) {
  const router = useRouter();

  const continueTo = (pathname: string) => {
    router.push(pathname);
  };

  useEffect(() => {
    const handleRouteChange = (e: BeforeUnloadEvent) => {
      if (document.activeElement && !canLeave) {
        e.preventDefault();

        onBlocked(document.activeElement.href, isSubmitting);
      }
    };

    document.querySelectorAll(`a:not([target="_blank"])`).forEach(link => {
      link.addEventListener("click", handleRouteChange);
    });

    return () => {
      document.querySelectorAll(`a:not([target="_blank"])`).forEach(link => {
        link.removeEventListener("click", handleRouteChange);
      });
    };
  }, [canLeave, isSubmitting]);

  return {
    continueTo,
  };
}
