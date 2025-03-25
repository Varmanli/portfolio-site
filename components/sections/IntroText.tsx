import Image from "next/image";
import AccentButton from "@/components/ui/AccentButton";

export default function IntroText() {
  return (
    <div className="relative flex flex-col gap-5 justify-end items-end">
      <p className="rotate-[335deg] text-3xl absolute right-[-17%] top-[-5%] font-bold">
        سلام!<br></br> من ملیکا شمیرانی،<br></br> طراح گرافیک هستم.
      </p>
      <div></div>
      <p className="bg-white rounded-xl border-3 p-5 w-xl text-2xl mt-20">
        من با نزدیک به ۳ سال سابقه‌ی رسمی در حوزه‌ی گرافیک، علاقه‌مند به انجام
        پروژه‌های چالش‌برانگیز و خلاقانه هستم.<br></br> خوشحالم که شما را در
        صفحه‌ی خودم می‌بینم!<br></br> اگر ایده‌ای در ذهن دارید، می‌توانم در
        تبدیل آن به یک طراحی حرفه‌ای و اجراپذیر همراهتان باشم.
      </p>
      <AccentButton
        text="مشاهده نمونه‌کارها"
        textSize="text-xl"
        margin="ml-5"
      />
      <Image
        src="/button-icon.svg"
        width={50}
        height={50}
        alt="icon"
        className="absolute left-[42%] bottom-[-5%]"
      />
    </div>
  );
}
