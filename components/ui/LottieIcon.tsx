"use client";
import dynamic from "next/dynamic";
import { LottieIconProps } from "@/types/pageContent";
import { useIsMounted } from "@/hooks/useIsMounted";

/**
 * Dynamically imported Lottie component to avoid SSR issues
 * TODO: Consider adding error boundary for failed animation loads
 */
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full animate-pulse bg-gray-200 rounded-lg" />
  ),
});

/**
 * LottieIcon Component
 * Renders a Lottie animation with responsive sizing and loading states
 *
 * @component
 * @param {LottieIconProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export default function LottieIcon({
  src,
  size = 160,
  sizeMobile,
  sizeLg,
  className = "",
  loop = false,
  autoplay = true,
}: LottieIconProps) {
  const isMounted = useIsMounted();
  const baseSize = size;
  const mobileSize = sizeMobile ?? size;
  const lgSize = sizeLg ?? size;

  const style = {
    width: `${baseSize}px`,
    height: `${baseSize}px`,
  };

  // Show loading state until component is mounted
  if (!isMounted) {
    return (
      <div
        className={`animate-pulse bg-gray-200 rounded-lg ${className}`}
        style={style}
      />
    );
  }

  return (
    <>
      {/* Responsive sizing styles */}
      <style jsx>{`
        @media (max-width: 767px) {
          .lottie-icon {
            width: ${mobileSize}px;
            height: ${mobileSize}px;
          }
        }
        @media (min-width: 1024px) {
          .lottie-icon {
            width: ${lgSize}px;
            height: ${lgSize}px;
          }
        }
      `}</style>
      <div className={`inline-block lottie-icon ${className}`}>
        <Lottie animationData={src} loop={loop} autoplay={autoplay} />
      </div>
    </>
  );
}
