"use client";
import Image from "next/image";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-white border-4 border-black py-10 px-6 text-center max-w-[900px] mx-auto mt-20 shadow-xl shadow-black relative">
      <h2 className="text-2xl lg:text-4xl font-extrabold mb-6">
        دوست دارید طراحی پروژه شما رو آغاز کنیم؟
      </h2>
      <p className="text-lg mb-8 leading-relaxed">
        ممنون که تا اینجا همراه من بودید.
        <br />
        برای شروع همکاری فقط کافیه روی دکمه زیر کلیک کنید!
      </p>

      <Link
        href="/hire-me"
        className="inline-block bg-sky-200 text-black border-4 border-black rounded-full px-10 py-3 font-bold text-lg hover:scale-105 transition-transform"
      >
        ارتباط با من
      </Link>

      <Image
        src="/button-icon.svg"
        alt="icon"
        width={60}
        height={60}
        className=" absolute bottom-3 right-3 lg:right-77"
      />
    </section>
  );
}
