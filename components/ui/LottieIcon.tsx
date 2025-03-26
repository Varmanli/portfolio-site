"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LottieIconProps } from "@/types/pageContent";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full animate-pulse bg-gray-200 rounded-lg" />
  ),
});

export default function LottieIcon({
  src,
  size = 160,
  sizeMobile,
  sizeLg,
  className = "",
  loop = false,
  autoplay = true,
}: LottieIconProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const baseSize = size;
  const mobileSize = sizeMobile ?? size;
  const lgSize = sizeLg ?? size;

  const style = {
    width: `${baseSize}px`,
    height: `${baseSize}px`,
  };

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
