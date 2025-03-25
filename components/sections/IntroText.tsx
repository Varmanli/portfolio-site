import Image from "next/image";
import AccentButton from "@/components/ui/AccentButton";

export default function IntroText() {
  return (
    <div className="relative flex flex-col gap-5 justify-center items-center lg:justify-end lg:items-end">
      <p className="lg:rotate-[335deg] text-3xl lg:absolute right-[-17%] top-[-5%] font-bold">
        سلام!<br></br> من ملیکا شمیرانی،<br></br> طراح گرافیک هستم.
      </p>
      <p className="bg-white rounded-xl border-3 mx-3 lg:mx-0 p-5 lg:w-xl text-lg lg:text-2xl mt-20">
        من با نزدیک به ۳ سال سابقه‌ی رسمی در حوزه‌ی گرافیک، علاقه‌مند به انجام
        پروژه‌های چالش‌برانگیز و خلاقانه هستم.<br></br> خوشحالم که شما را در
        صفحه‌ی خودم می‌بینم!<br></br> اگر ایده‌ای در ذهن دارید، می‌توانم در
        تبدیل آن به یک طراحی حرفه‌ای و اجراپذیر همراهتان باشم.
      </p>
      <AccentButton
        text="مشاهده نمونه‌کارها"
        textSize="text-xl"
        margin="lg:ml-5 mb-10 lg:mb-0"
      />
      <Image
        src="/button-icon.svg"
        width={50}
        height={50}
        alt="icon"
        className="absolute bottom-4 right-7 lg:bottom-[-4%] lg:right-71"
      />
    </div>
  );
}
