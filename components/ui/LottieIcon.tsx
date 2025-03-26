"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

interface LottieIconProps {
  src: object; // انیمیشن لوتی
  size?: number; // سایز پایه پیکسلی
  sizeMobile?: number; // سایز موبایل (اختیاری)
  sizeLg?: number; // سایز دسکتاپ (اختیاری)
  className?: string; // کلاس‌های اضافی
  loop?: boolean; // لوپ بودن انیمیشن
  autoplay?: boolean; // پخش خودکار
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

  const style: React.CSSProperties = {
    width: sizeMobile ? undefined : `${size}px`,
    height: sizeMobile ? undefined : `${size}px`,
  };

  const mobileStyle = sizeMobile
    ? { width: `${sizeMobile}px`, height: `${sizeMobile}px` }
    : {};

  const lgStyle = sizeLg ? { width: `${sizeLg}px`, height: `${sizeLg}px` } : {};

  if (!isMounted) {
    return (
      <div
        className={`animate-pulse bg-gray-200 rounded-lg ${className}`}
        style={{ ...style, ...mobileStyle }}
      />
    );
  }

  return (
    <div
      className={`inline-block ${className}`}
      style={{ ...style, ...mobileStyle }}
    >
      <div className="block lg:hidden" style={mobileStyle}>
        <Lottie animationData={src} loop={loop} autoplay={autoplay} />
      </div>
      <div className="hidden lg:block" style={lgStyle || style}>
        <Lottie animationData={src} loop={loop} autoplay={autoplay} />
      </div>
    </div>
  );
}
