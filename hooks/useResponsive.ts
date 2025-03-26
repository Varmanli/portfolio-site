import { useEffect, useState } from "react";
import { BREAKPOINTS } from "@/utils/constants";

/**
 * Custom hook for handling responsive behavior
 * Returns the current breakpoint based on window width
 *
 * @returns {string} Current breakpoint ('sm' | 'md' | 'lg' | 'xl')
 *
 * @example
 * ```tsx
 * const breakpoint = useResponsive();
 * if (breakpoint === 'lg') {
 *   // Desktop-specific logic
 * }
 * ```
 */
export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<keyof typeof BREAKPOINTS>("sm");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= BREAKPOINTS.xl) setBreakpoint("xl");
      else if (width >= BREAKPOINTS.lg) setBreakpoint("lg");
      else if (width >= BREAKPOINTS.md) setBreakpoint("md");
      else setBreakpoint("sm");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}
