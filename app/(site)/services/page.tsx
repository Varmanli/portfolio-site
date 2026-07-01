import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import LottieIcon from "@/components/ui/LottieIcon";
import Image from "next/image";
import Link from "next/link";
import animation from "@/assets/animations/services.json";
import { ServiceDto, listServices } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "خدمات | ملیکا شمیرانی",
  description: "خدمات طراحی گرافیک ارائه‌شده توسط ملیکا شمیرانی.",
  path: "/services",
});

export default async function ServicesPage() {
  let services: ServiceDto[] = [];

  try {
    services = await listServices();
  } catch (error) {
    console.error("خطا در دریافت اطلاعات نمونه‌کار:", error);
  }

  return (
    <>
      <Header />
      <section className="px-6 pb-10 max-w-[1440px] mx-auto relative z-10">
        <div className="flex justify-center items-center mt-3 lg:mt-0 mb-6">
          <h1 className="text-lg lg:text-4xl font-bold text-center">
            آنچه می‌توانم برای شما انجام دهم
          </h1>
          <LottieIcon src={animation} size={120} sizeMobile={60} />
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mx-20 lg:gap-15">
          {services.map((service) => (
            <div
              key={service.id}
              className="
        group flex items-center justify-between gap-4
        rounded-[1.5rem] border-2 border-black bg-white
        p-5 shadow-[7px_7px_0_#111]
        transition-all duration-300
        hover:-translate-x-1 hover:-translate-y-1
        hover:bg-[#CAF3AB]
        hover:shadow-[10px_10px_0_#111]
      "
            >
              <span className="text-lg font-black leading-8 text-black lg:text-2xl">
                {service.title}
              </span>

              <Link href="/hire-me" aria-label={`درخواست ${service.title}`}>
                <Image
                  src="/Service-icon.svg"
                  alt="icon"
                  width={38}
                  height={38}
                  className="h-auto w-auto"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
