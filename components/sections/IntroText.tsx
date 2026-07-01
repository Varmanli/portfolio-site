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
      <h1
        className="
          lg:absolute lg:right-[-26%] lg:top-[-10%] lg:rotate-[335deg]
          mt-[10px] h-[230px]
          w-auto whitespace-pre-line border-0 bg-transparent p-0
          text-lg font-black leading-9 text-black
          selection:bg-[#F196E5]/30
        "
      >
        {safeTitle}
      </h1>

      {/* توضیح */}
      <textarea
        readOnly
        className="
          mx-3 w-[330px] h-[275px]
          lg:mx-0 lg:w-[590px] lg:h-[240px] lg:mt-20 
          resize-none rounded-[1.5rem] border-3 border-black bg-white
          p-5 text-lg font-bold leading-9 text-gray-900
          shadow-[7px_7px_0_#111]
          outline-none transition
          selection:bg-[#CAF3AB]
          lg:text-xl lg:leading-10
        "
        value={safeDesc}
      />

      {/* دکمه نمونه‌کارها */}
      <Link href="/portfolio">
        <AccentButton
          text="مشاهده نمونه‌کارها"
          textSize="text-xl"
          margin="mb-10 lg:mb-0"
          className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        />
      </Link>

      {/* آیکون‌ها */}
      <Image
        src={smile}
        alt="icon"
        width={34}
        height={34}
        className="absolute right-5 top-1 z-30 rotate-12 lg:right-7 lg:top-[-10%] lg:-rotate-20"
      />

      <Image
        src="/button-icon.svg"
        width={40}
        height={40}
        alt="icon"
        className="absolute bottom-2 right-3 h-auto w-auto lg:bottom-[-8%] lg:right-75 drop-shadow-[2px_2px_0_#111]"
      />
    </div>
  );
}
