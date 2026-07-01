"use client";

import { Header } from "@/components/shared/Header";
import { FaPhoneAlt, FaTelegram, FaWhatsapp } from "react-icons/fa";
import HireMeAnim from "@/assets/animations/hireme.json";
import LottieIcon from "@/components/ui/LottieIcon";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "@/components/skeletons/Skeleton";
import { MdArrowBack, MdSend } from "react-icons/md";

type ContentItem = {
  key: string;
  value: string;
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [homeContent, setHomeContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await fetch("/api/content");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: ContentItem[] = await response.json();

        const content = data.reduce(
          (acc, item) => {
            acc[item.key] = item.value;
            return acc;
          },
          {} as Record<string, string>,
        );

        setHomeContent(content);
      } catch {
        setError("خطا در دریافت اطلاعات صفحه تماس");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  const contactFormEnabled = homeContent.contact_form_enabled !== "false";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactFormEnabled || isSubmitting) return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("لطفاً همه فیلدها را کامل کنید");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) throw new Error("ارسال با مشکل مواجه شد");

      toast.success(
        homeContent.contact_success_message || "پیام با موفقیت ارسال شد! 🙌",
      );

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("مشکلی در ارسال پیام پیش آمد");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />

        <main className="relative mx-auto w-full max-w-[1440px] px-4 py-10 lg:px-20">
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="order-2 rounded-[2rem] border-2 border-black bg-[#CAF3AB] p-5 shadow-[10px_10px_0_#111] lg:order-1">
              <Skeleton className="mb-5 h-7 w-36 rounded-full" />
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-2xl" />
                <Skeleton className="h-12 w-full rounded-2xl" />
                <Skeleton className="h-32 w-full rounded-2xl" />
                <Skeleton className="ms-auto h-11 w-24 rounded-full" />
              </div>
            </div>

            <div className="order-1 space-y-6 rounded-[2rem] border-2 border-black bg-[#CAF3AB] p-5 shadow-[10px_10px_0_#111] lg:order-2">
              <Skeleton className="h-8 w-40 rounded-full" />
              <Skeleton className="h-40 w-full rounded-3xl" />
              <div className="space-y-4">
                <Skeleton className="h-16 w-full rounded-2xl" />
                <Skeleton className="h-16 w-full rounded-2xl" />
                <Skeleton className="h-16 w-full rounded-2xl" />
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="mx-auto flex min-h-[60vh] max-w-[900px] items-center justify-center px-4 text-center">
          <div className="rounded-[2rem] border-2 border-black bg-white p-8 shadow-[10px_10px_0_#F196E5]">
            <p className="text-lg font-black text-gray-900">{error}</p>
            <p className="mt-2 text-sm leading-7 text-gray-500">
              لطفاً صفحه را دوباره بارگذاری کنید.
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="relative mx-auto w-full max-w-[1440px] overflow-hidden px-4 py-8 lg:px-20 lg:py-12">
        <div className="absolute right-0 top-20 -z-10 h-52 w-52 rounded-full bg-[#F196E5]/25 blur-3xl" />
        <div className="absolute left-4 bottom-8 -z-10 h-64 w-64 rounded-full bg-[#CAF3AB]/55 blur-3xl" />
        <div className="absolute left-1/2 top-12 -z-10 h-36 w-36 rounded-full bg-sky-200/40 blur-3xl" />

        <section className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          {/* اطلاعات تماس - کوچکتر و جابه‌جا شده */}
          <div className="order-2 relative rounded-[2rem] border-2 border-black bg-[#CAF3AB] p-5 shadow-[10px_10px_0_#111] lg:order-1 lg:p-6">
            <div className="mb-5 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-5 py-2 text-sm font-black text-white shadow-[4px_4px_0_#111]">
              راه‌های ارتباطی
            </div>

            <div className="rounded-[1.75rem] border-2 border-black bg-white p-5 shadow-[5px_5px_0_#111] lg:p-6">
              <p className="whitespace-pre-wrap text-right text-lg font-bold leading-10 text-gray-800">
                {homeContent.contact_desc ||
                  "برای شروع همکاری، سفارش طراحی یا گفت‌وگو درباره پروژه‌ات، از راه‌های زیر با من در ارتباط باش."}
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div className="group rounded-[1.5rem] border-2 border-black bg-white p-3 shadow-[5px_5px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#111]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${homeContent.contact_phone}`}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[3px_3px_0_#111] transition hover:scale-105"
                      aria-label="تماس تلفنی"
                    >
                      <FaPhoneAlt className="text-xl" />
                    </a>

                    <a
                      href={`https://t.me/${homeContent.contact_phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#9BE7FF] text-black shadow-[3px_3px_0_#111] transition hover:scale-105"
                      aria-label="تلگرام"
                    >
                      <FaTelegram className="text-2xl" />
                    </a>

                    <a
                      href={`https://wa.me/${homeContent.contact_phone?.replace(/^0/, "98")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#9EF7B1] text-black shadow-[3px_3px_0_#111] transition hover:scale-105"
                      aria-label="واتساپ"
                    >
                      <FaWhatsapp className="text-2xl" />
                    </a>
                  </div>

                  <div className="min-w-0 text-right">
                    <p
                      dir="ltr"
                      className="mt-1 truncate text-base font-black text-black"
                    >
                      {homeContent.contact_phone || "ثبت نشده"}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={`mailto:${homeContent.contact_email}`}
                className="group block rounded-[1.5rem] border-2 border-black bg-white p-3 shadow-[5px_5px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#111]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#F196E5] text-white shadow-[3px_3px_0_#111] transition group-hover:scale-105">
                    <IoMdMail className="text-3xl" />
                  </span>

                  <div className="min-w-0 text-right">
                    <p
                      dir="ltr"
                      className="mt-1 truncate text-base font-black text-black"
                    >
                      {homeContent.contact_email || "ثبت نشده"}
                    </p>
                  </div>
                </div>
              </a>

              <div className="group rounded-[1.5rem] border-2 border-black bg-white p-3 shadow-[5px_5px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#111]">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#B8A7FF] text-white shadow-[3px_3px_0_#111] transition group-hover:scale-105">
                    <FaLocationDot className="text-2xl" />
                  </span>

                  <div className="min-w-0 text-right">
                    <p className="mt-1 truncate text-base font-black text-black">
                      {homeContent.contact_city || "ثبت نشده"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* فرم تماس - عریض تر */}
          <div className="order-1 relative rounded-[2rem] border-2 border-black bg-[#CAF3AB] p-5 shadow-[10px_10px_0_#111] lg:order-2 lg:p-7">
            <div className="pointer-events-none absolute top-14 left-15 z-10 w-28 lg:top-6 lg:left-28 lg:w-36">
              <LottieIcon src={HireMeAnim} loop sizeMobile={110} />
            </div>

            <div className="mb-6 flex items-center justify-between gap-3 pt-8 lg:pt-10">
              <div>
                <h1 className="text-2xl font-black text-black">پیام بفرست</h1>
                <p className="mt-1 text-sm font-bold leading-6 text-black/60">
                  ایده‌ات رو بگو، باهم تبدیلش می‌کنیم به تصویر.
                </p>
              </div>

              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0_#111]">
                <MdSend size={24} />
              </span>
            </div>

            {contactFormEnabled ? (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-right text-sm font-black text-black">
                    نام شما
                  </label>
                  <input
                    type="text"
                    className="h-13 w-full rounded-2xl border-2 border-black bg-white px-4 text-sm font-bold text-gray-900 outline-none transition placeholder:text-gray-400 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[4px_4px_0_#656ED3]"
                    placeholder="مثلاً نیکی"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-right text-sm font-black text-black">
                    ایمیل شما
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    className="h-13 w-full rounded-2xl border-2 border-black bg-white px-4 text-left text-sm font-bold text-gray-900 outline-none transition placeholder:text-gray-400 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[4px_4px_0_#656ED3]"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-right text-sm font-black text-black">
                    پیام شما
                  </label>
                  <textarea
                    rows={6}
                    className="min-h-40 w-full resize-none rounded-2xl border-2 border-black bg-white px-4 py-3 text-sm font-bold leading-7 text-gray-900 outline-none transition placeholder:text-gray-400 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[4px_4px_0_#656ED3]"
                    placeholder="سلام، من علاقه‌مند به همکاری هستم..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-2 inline-flex items-center justify-center gap-2 self-end rounded-full border-2 border-black bg-sky-200 px-7 py-3 text-sm font-black text-black shadow-[5px_5px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#111] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "در حال ارسال..." : "ثبت پیام"}
                  <MdArrowBack
                    size={18}
                    className="transition group-hover:-translate-x-1"
                  />
                </button>
              </form>
            ) : (
              <div className="flex min-h-48 flex-col items-center justify-center gap-2 rounded-[1.75rem] border-2 border-dashed border-black/30 bg-white/60 p-6 text-center">
                <p className="text-lg font-black text-black">
                  فرم تماس در حال حاضر غیرفعال است
                </p>
                <p className="text-sm font-bold leading-7 text-black/60">
                  لطفاً از راه‌های ارتباطی دیگر با من در تماس باشید.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
