import { Header } from "@/components/shared/Header";
import StarIcon from "@/components/ui/StarIcon";
import axios from "axios";
import Image from "next/image";

type Service = {
  id: number;
  title: string;
};

export default async function ServicesPage() {
  let services: Service[] = [];

  try {
    const { data } = await axios.get<Service[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/services`,
      {
        withCredentials: true,
      }
    );
    services = data;
  } catch (error) {
    console.error("خطا در دریافت اطلاعات نمونه‌کار:", error);
  }

  return (
    <>
      <Header />
      <section className="px-6 py-10 max-w-[1440px] mx-auto relative z-10">
        <p className="text-lg lg:text-4xl font-bold mb-8 text-center">
          آنچه می‌توانم برای شما انجام دهم
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-15 lg:mx-20">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex justify-between items-center gap-4 p-5 border-4 border-black bg-white  shadow-xl shadow-black/60"
            >
              <span className="lg:text-2xl font-semibold">{service.title}</span>
              <Image
                src="/Service-icon.svg"
                alt="icon"
                width={38}
                height={38}
              />
            </div>
          ))}
        </div>
      </section>
      <StarIcon
        className="absolute bottom-[-80%] left-0 lg:left-0 lg:bottom-[-40%]"
        size={100}
        color="#F3ABCB"
      />
    </>
  );
}
