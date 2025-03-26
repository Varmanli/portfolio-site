import Image from "next/image";
import Link from "next/link";
import { PortfolioItem } from "@/types/pageContent";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="border-2 border-black bg-white shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-3 space-y-1 text-right">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base lg:text-lg">{item.title}</h3>
          <Link href={`/portfolio/${item.id}`} className="text-xl">
            ↗
          </Link>
        </div>
        <p className="text-sm text-gray-600">{item.subtitle}</p>
      </div>
    </div>
  );
}
