import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Removes a query parameter from the address bar without navigating, e.g. a one-time
 * code that shouldn't stay in the browser history or be sent on in a Referer header.
 */
export default function useRemoveSearchParam(name: string) {
  const searchParams = useSearchParams();
  const hasParam = searchParams.has(name);

  useEffect(() => {
    if (!hasParam) return;

    const url = new URL(window.location.href);
    url.searchParams.delete(name);

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`
    );
  }, [hasParam, name]);
}
