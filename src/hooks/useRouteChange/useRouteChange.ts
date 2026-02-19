import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";
import { useFormState } from "react-hook-form";

interface UseRouteChangeProps {
  canLeave?: boolean;
  onBlocked: (pathname: string | null, isSubmitting: boolean) => void;
}

export default function useRouteChange({
  canLeave,
  onBlocked,
}: UseRouteChangeProps) {
  const router = useRouter();
  const { isSubmitting } = useFormState();

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

    document.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", handleRouteChange);
    });

    return () => {
      document.querySelectorAll("a").forEach(link => {
        link.removeEventListener("click", handleRouteChange);
      });
    };
  }, [canLeave, isSubmitting]);

  return {
    continueTo,
  };
}
