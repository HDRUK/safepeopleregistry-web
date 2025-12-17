import { useEffect, useRef, useState } from "react";

export default function useElementScrollNearBottom(threshold = 50) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      // rect.bottom = how far the bottom of the element is from the top of the viewport
      const nearBottom = rect.bottom <= window.innerHeight + threshold;

      setIsNearBottom(nearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [threshold]);

  return { elementRef, isNearBottom };
}
