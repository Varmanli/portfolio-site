import { Header } from "@/components/shared/Header";
import LottieIcon from "@/components/ui/LottieIcon";
import Image from "next/image";
import Link from "next/link";
import animation from "@/assets/animations/services.json";
type Service = {
  id: number;
  title: string;
};

export default async function ServicesPage() {
  let services: Service[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) throw new Error("خطا در دریافت اطلاعات");

    services = await res.json();
  } catch (error) {
    console.error("خطا در دریافت اطلاعات نمونه‌کار:", error);
  }

  return (
    <>
      <Header />
      <section className="px-6 pb-10 max-w-[1440px] mx-auto relative z-10">
        <div className="flex justify-center items-center mt-3 lg:mt-0 mb-6">
          <p className="text-lg lg:text-4xl font-bold text-center">
            آنچه می‌توانم برای شما انجام دهم
          </p>
          <LottieIcon src={animation} size={120} sizeMobile={60} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-15 lg:mx-20">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex justify-between items-center gap-4 p-5 border-4 border-black bg-white shadow-xl shadow-black/60"
            >
              <span className="lg:text-2xl font-semibold">{service.title}</span>
              <Link href="hire-me">
                <Image
                  src="/Service-icon.svg"
                  alt="icon"
                  width={38}
                  height={38}
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
