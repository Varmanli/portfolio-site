"use client";

import Image from "next/image";
import { PortfolioItem } from "@/types/pageContent";
import { useRouter } from "next/navigation";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/portfolio/${item.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group h-fit relative overflow-hidden border-5 border-black bg-white shadow-xl shadow-black transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 p-5 cursor-pointer"
    >
      <Image
        src={item.thumbnail}
        alt={item.title}
        width={500}
        height={400}
        className="w-full h-auto object-cover"
      />

      {/* اطلاعات زیر عکس */}
      <div className="flex justify-between items-start p-4">
        <div>
          <h3 className="text-xl lg:text-3xl font-bold mb-2">{item.title}</h3>
          {item.shortDesc && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.shortDesc}
            </p>
          )}
        </div>

        <Image src="/Service-icon.svg" alt="show more" width={30} height={30} />
      </div>
    </div>
  );
}
