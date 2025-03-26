"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

interface LottieIconProps {
  src: object; // فایل JSON انیمیشن
  size?: number; // سایز
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full animate-pulse bg-gray-200 rounded-lg" />
  ),
});

export default function LottieIcon({
  src,
  size = 160,
  className = "",
  loop = false,
  autoplay = true,
}: LottieIconProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className={`animate-pulse bg-gray-200 rounded-lg ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <Lottie animationData={src} loop={loop} autoplay={autoplay} />
    </div>
  );
}
