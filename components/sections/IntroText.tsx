import Image from "next/image";
import AccentButton from "@/components/ui/AccentButton";
import Link from "next/link";
import smile from "@/assets/smile.svg";

interface PropsType {
  title?: string;
  desc?: string;
}

export default function IntroText({ title, desc }: PropsType) {
  const safeTitle = title ?? "";
  const safeDesc = desc ?? "";

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 lg:items-end lg:justify-end">
      {/* عنوان */}
      <textarea
        readOnly
        className="
          lg:absolute lg:right-[-17%] lg:top-[-5%] lg:rotate-[335deg]
          mt-[10px] h-[230px]
          w-auto resize-none border-0 bg-transparent p-0 text-3xl font-bold
          outline-none shadow-none
        "
        value={safeTitle}
      />

      {/* توضیح */}
      <textarea
        readOnly
        className="
          mx-3 w-[330px] h-[270px]
          lg:mx-0 lg:w-[590px] lg:h-[240px] lg:mt-20
          resize-none rounded-xl border-3 bg-white p-5
          text-lg lg:text-2xl
          outline-none shadow-none
        "
        value={safeDesc}
      />

      {/* دکمه نمونه‌کارها */}
      <Link href="/portfolio">
        <AccentButton
          text="مشاهده نمونه‌کارها"
          textSize="text-xl"
          margin="lg:ml-5 mb-10 lg:mb-0"
          className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        />
      </Link>

      {/* آیکون‌ها */}
      <Image
        src={smile}
        alt="icon"
        width={30}
        height={30}
        className="absolute top-2 right-21 lg:top-[-9%] lg:right-6 lg:-rotate-20"
      />
      <Image
        src="/button-icon.svg"
        width={40}
        height={40}
        alt="icon"
        className="absolute bottom-2 right-3 h-auto w-auto lg:bottom-[-8%] lg:right-68"
      />
    </div>
  );
}
