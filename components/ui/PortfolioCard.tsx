import Image from "next/image";
import Link from "next/link";
import { PortfolioItem } from "@/types/pageContent";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="group relative overflow-hidden border-5 border-black bg-white shadow-xl shadow-black transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 p-5">
      <Image
        src={item.image}
        alt={item.title}
        width={500}
        height={400}
        className="w-full h-auto object-cover "
      />

      {/* اطلاعات زیر عکس */}
      <div className="flex justify-between items-start p-4">
        <div>
          <h3 className="text-xl lg:text-3xl font-bold mb-2">{item.title}</h3>
          {item.description && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        <Image
          src="./Service-icon.svg"
          alt="show more"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
}
