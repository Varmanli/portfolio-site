"use client";

import { Header } from "@/components/shared/Header";
import { FaPhoneAlt, FaTelegram, FaWhatsapp } from "react-icons/fa";
import HireMeAnim from "@/assets/animations/hireme.json";
import LottieIcon from "@/components/ui/LottieIcon";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { ContactRow } from "@/components/shared/ContactRow";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("ارسال با مشکل مواجه شد");

      toast.success("پیام با موفقیت ارسال شد! 🙌");
      // پاک‌سازی فرم
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("مشکلی در ارسال پیام پیش آمد");
      console.error(error);
    }
  };
  return (
    <>
      <Header />
      <section className="z-10 relative flex flex-col-reverse gap-15 items-center justify-center p-4  lg:flex-row lg:items-start lg:gap-20 lg:px-20 w-full max-w-[1440px] mx-auto">
        <div className="px-4 lg:w-2/5 space-y-10 text-right">
          {/* متن معرفی */}
          <p className="text-xl font-semibold leading-loose">
            اگر پروژه‌ای دارید که نیاز به دقت، خلاقیت و اجرای حرفه‌ای داره،
            خوشحال می‌شم بخشی از مسیر شما باشم.
            <br />
            <br />
            مهم نیست پروژه‌تون کوچیکه یا بزرگ؛ می‌تونید از طریق فرم رو به رو یا
            اطلاعات تماسی که در سایت قرار گرفته، همکاری رو با من آغاز کنید.
          </p>

          {/* اطلاعات تماس */}
          <div className="space-y-6">
            <ContactRow
              icons={[
                <FaPhoneAlt key="phone" className="text-[#F196E5] text-3xl" />,
                <FaTelegram
                  key="telegram"
                  className="text-[#F196E5] text-3xl hover:scale-110 transition-transform"
                />,
                <FaWhatsapp
                  key="whatsapp"
                  className="text-[#F196E5] text-3xl hover:scale-110 transition-transform"
                />,
              ]}
              text="+989102408010"
            />
            <ContactRow
              icons={[
                <IoMdMail key="email" className="text-[#F196E5] text-3xl" />,
              ]}
              text="m.shemirani33@gmail.com"
            />
            <ContactRow
              icons={[
                <FaLocationDot
                  key="location"
                  className="text-[#F196E5] text-3xl"
                />,
              ]}
              text="تهران"
            />
          </div>
        </div>

        {/* فرم تماس */}
        <div className="relative bg-[#CAF3AB] px-5 py-8 rounded-xl w-full max-w-md shadow-lg">
          {/* انیمیشن بالا */}
          <div className="absolute -top-8 left-20 lg:-top-40 lg:left-34 -translate-x-1/2 w-32">
            <LottieIcon src={HireMeAnim} loop sizeMobile={110} />
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="font-bold text-right">نام شما:</label>
            <input
              type="text"
              className="border-2 border-[#656ED3] bg-white rounded-md p-2"
              placeholder="مثلاً ملیکا"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="font-bold text-right">ایمیل شما:</label>
            <input
              type="email"
              className="border-2 border-[#656ED3] bg-white rounded-md p-2"
              placeholder="ایمیل فعال خود را وارد کنید"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="font-bold text-right">پیام شما:</label>
            <textarea
              rows={5}
              className="border-2 border-[#656ED3] bg-white rounded-md p-2"
              placeholder="سلام، من علاقه‌مند به همکاری هستم..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-sky-200 text-black font-bold border-2 border-black px-6 py-2 rounded-full self-end"
            >
              ثبت
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
