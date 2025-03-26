import { Header } from "@/components/shared/Header";
import Image from "next/image";

const services: string[] = [
  "آماده‌سازی فایل برای انواع چاپ",
  "طراحی لیبل و لفاف بسته‌بندی",
  "طراحی کاتالوگ و بروشور",
  "نقاشی دیجیتال و طراحی مسکات ",
  "طراحی وب",
  "اجرای انواع پروژه‌های گرافیکی",
  "انجام تفکیک رنگ",
  "صفحه‌آرایی",
  "طراحی اوراق اداری",
  "طراحی اوراق اداری",
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <section className="px-6 py-10 max-w-[1440px] mx-auto">
        <p className="text-2xl lg:text-4xl font-bold mb-8 text-center">
          آنچه می‌توانم برای شما انجام دهم
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-10 lg:gap-15 lg:mx-20">
          {services.map((item: string, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center gap-4 p-5 border-4 border-black bg-white  shadow-xl shadow-black/60"
            >
              <span className=" text-lg lg:text-2xl font-semibold">{item}</span>
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
    </>
  );
}
