import { useEffect } from "react";
import useElementScrollNearBottom from "../useElementScrollNearBottom";
import useDebounce from "../useDebounce";

interface UseInfiniteNextProps {
  fetchNextPage: () => void;
}

export default function useInfiniteNext({
  fetchNextPage,
}: UseInfiniteNextProps) {
  const { elementRef, isNearBottom } = useElementScrollNearBottom();
  const [debouncedIsNearBottom, setDebouncedIsNearBottom] = useDebounce(
    isNearBottom,
    500
  );

  useEffect(() => {
    if (debouncedIsNearBottom) {
      fetchNextPage();
      setDebouncedIsNearBottom(false);
    }
  }, [debouncedIsNearBottom, fetchNextPage, setDebouncedIsNearBottom]);

  return { elementRef };
}
