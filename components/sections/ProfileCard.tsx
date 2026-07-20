"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import StarIcon from "@/components/ui/StarIcon";
import LottieIcon from "@/components/ui/LottieIcon";
import light from "@/assets/animations/light.json";
import { getProfileImageSource } from "@/utils/image";

interface ProfileCardProps {
  image?: string;
}

export default function ProfileCard({ image }: ProfileCardProps) {
  const validatedImageSource = getProfileImageSource(image);
  const [imageSource, setImageSource] = useState(validatedImageSource);

  // The content row can change during client navigation. Reset a previous
  // fallback only when the validated source itself changes.
  useEffect(() => {
    setImageSource(validatedImageSource);
  }, [validatedImageSource]);

  return (
    <div className="w-fit border-6 shadow-2xl border-black p-10 bg-white mt-5 mx-3 lg:mx-0 lg:mt-15 relative">
      {/* دایره ها */}
      <div className="absolute bg-black w-4 h-4 rounded-full top-3 left-[35%]" />
      <div className="absolute bg-black w-4 h-4 rounded-full top-3 right-[35%]" />

      <Image
        className="border-4 border-black"
        src={imageSource}
        alt="عکس من"
        width={350}
        height={360}
        priority
        // Arvan URLs must be fetched by the visitor's browser. Without this,
        // Next's image optimizer fetches them from the Node server and a DNS
        // failure there turns the image request into a runtime `fetch failed`.
        unoptimized
        onError={() => setImageSource(getProfileImageSource(undefined))}
      />

      <StarIcon
        className="absolute right-0 bottom-1"
        size={100}
        color="#FF6258"
      />

      <div className="absolute -left-[3%] top-20 flex h-[70px] w-[70px] justify-center rounded-full bg-background p-2 border-4 shadow-2xl">
        <LottieIcon src={light} size={50} loop />
      </div>
    </div>
  );
}
