import { Header } from "@/components/shared/Header";
import { FaPhoneAlt, FaTelegram, FaWhatsapp } from "react-icons/fa";
import HireMeAnim from "@/assets/animations/hireme.json";
import LottieIcon from "@/components/ui/LottieIcon";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

export default function ContactPage() {
  return (
    <>
      <Header />
      <section className="z-10 relative flex flex-col gap-15 items-center justify-center p-4  lg:flex-row lg:items-start lg:gap-20 lg:px-20 w-full max-w-[1440px] mx-auto">
        <div className=" px-4 lg:w-2/5 space-y-6">
          <p className="text-xl font-semibold leading-relaxed">
            اگر پروژه‌ای دارید که نیاز به دقت، خلاقیت و اجرای حرفه‌ای داره،
            خوشحال می‌شم بخشی از مسیر شما باشم.
            <br />
            <br />
            مهم نیست پروژه‌تون کوچیکه یا بزرگ؛ می‌تونید از طریق فرم رو به رو یا
            اطلاعات تماسی که در سایت قرار گرفته، همکاری رو با من آغاز کنید.
          </p>

          <div className="flex items-center gap-5">
            <FaTelegram className="text-[#F196E5] text-4xl" />
            <FaWhatsapp className="text-[#F196E5] text-4xl" />
            <FaPhoneAlt className="text-[#F196E5] text-4xl" />
            <span className="text-xl">989102408010+</span>
          </div>

          <div className="flex items-center gap-5">
            <IoMdMail className="text-[#F196E5] text-4xl" />
            <span className="text-xl">m.shemirani33@gmail.com</span>
          </div>

          <div className="flex items-center gap-5">
            <FaLocationDot className="text-[#F196E5] text-4xl" />
            <span className="text-xl">تهران</span>
          </div>
        </div>

        {/* فرم تماس */}
        <div className="relative bg-[#CAF3AB] px-5 py-8 rounded-xl w-full max-w-md shadow-lg">
          {/* انیمیشن بالا */}
          <div className="absolute -top-29 left-20 lg:-top-40 lg:left-34 -translate-x-1/2 w-32">
            <LottieIcon src={HireMeAnim} loop sizeMobile={120} />
          </div>

          <form className="flex flex-col gap-4">
            <label className="font-bold text-right">نام شما:</label>
            <input
              type="text"
              className="border-2 border-[#656ED3] bg-white  rounded-md p-2"
              placeholder="مثلاً ملیکا"
            />

            <label className="font-bold text-right">ایمیل شما:</label>
            <input
              type="email"
              className="border-2 border-[#656ED3] bg-white rounded-md p-2"
              placeholder="ایمیل فعال خود را وارد کنید"
            />

            <label className="font-bold text-right">پیام شما:</label>
            <textarea
              rows={5}
              className="border-2 border-[#656ED3] bg-white rounded-md p-2"
              placeholder="سلام، من علاقه‌مند به همکاری هستم..."
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
