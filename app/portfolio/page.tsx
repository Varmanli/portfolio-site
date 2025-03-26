import { Header } from "@/components/shared/Header";
import StarIcon from "@/components/ui/StarIcon";
import Image from "next/image";
import { PORTFOLIO_ITEMS } from "@/constants/portfolio";
import CallToAction from "@/components/sections/CallToAction";

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <section className="px-4 py-10 max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:mx-50 gap-10 lg:gap-24">
          {PORTFOLIO_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden border-5 border-black bg-white shadow-xl shadow-black transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 p-5"
            >
              {/* تصویر نمونه‌کار */}
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
                  <h3 className="text-xl lg:text-3xl font-bold mb-2">
                    {item.title}
                  </h3>
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
          ))}
        </div>
        <CallToAction />
      </section>

      {/* آیکون دکوری ستاره */}
      <StarIcon
        className="absolute bottom-[-40px] right-[10px] lg:bottom-[-60px] lg:right-[40px] z-0"
        size={100}
        color="#F3ABCB"
      />
    </>
  );
}
