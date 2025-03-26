import { useEffect, useState } from "react";

/**
 * Custom hook to handle component mounting state
 * Useful for components that need to render different content on client vs server
 * 
 * @returns {boolean} isMounted - Whether the component is mounted on the client
 * 
 * @example
 * ```tsx
 * const isMounted = useIsMounted();
 * if (!isMounted) return <LoadingState />;
 * return <ClientOnlyContent />;
 * ```
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
} 