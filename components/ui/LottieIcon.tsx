"use client";
import Lottie from "lottie-react";

interface LottieIconProps {
  src: object; // فایل JSON انیمیشن
  size?: number; // سایز
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieIcon({
  src,
  size = 160,
  className = "",
  loop = false,
  autoplay = true,
}: LottieIconProps) {
  return (
    <div
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <Lottie animationData={src} loop={loop} autoplay={autoplay} />
    </div>
  );
}
