import Image from "next/image";
import AccentButton from "@/components/ui/AccentButton";

interface PropsType {
  title: string;
  desc: string;
}

export default function IntroText({ title, desc }: PropsType) {
  return (
    <div className="relative flex flex-col gap-5 justify-center items-center lg:justify-end lg:items-end">
      <textarea className="resize-none border-0 outline-none bg-transparent shadow-none p-0 lg:rotate-[335deg] text-3xl lg:absolute right-[-17%] top-[-5%] font-bold h-[230px] mt-[10px]">
        {title}
      </textarea>
      <textarea className="resize-none  outline-none shadow-none bg-white rounded-xl border-3 mx-3 lg:mx-0 p-5 lg:w-[590px] text-lg lg:text-2xl h-[270px] w-[330px] lg:h-[240px] lg:mt-20">
        {desc}
      </textarea>
      <AccentButton
        text="مشاهده نمونه‌کارها"
        textSize="text-xl"
        margin="lg:ml-5 mb-10 lg:mb-0"
      />
      <Image
        src="/button-icon.svg"
        width={40}
        height={40}
        alt="icon"
        className="absolute bottom-2 right-3 w-auto h-auto lg:bottom-[-8%] lg:right-68"
      />
    </div>
  );
}
