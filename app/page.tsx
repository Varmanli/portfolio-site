import Image from "next/image";
import StarIcon from "@/components/ui/StarIcon";
import AccentButton from "@/components/ui/AccentButton";
import LottieIcon from "@/components/ui/LottieIcon";
import frog from "@/assets/animations/frog.json";
import arrow from "@/assets/animations/arrow.json";
import photoshop from "@/assets/animations/photoshop.json";
import ai from "@/assets/animations/ai.json";
import light from "@/assets/animations/light.json";
export default function Home() {
  return (
    <section className="flex justify-center  gap-30 pt-20 relative ">
      <div className="w-fit border-6 shadow-2xl border-black  p-10 bg-white mt-15 relative">
        <div className="absolute w-6.5 h-6.5 bg-white border-4 border-black top-[-4%] right-[-3.5%]"></div>
        <div className="absolute w-6.5 h-6.5 bg-white border-4 border-black top-[-4%] left-[-3.5%]"></div>
        <div className="absolute w-6.5 h-6.5 bg-white border-4 border-black bottom-[-4%] left-[-3.5%]"></div>
        <div className="absolute w-6.5 h-6.5 bg-white border-4 border-black bottom-[-4%] right-[-3.5%]"></div>
        <div className=" absolute bg-black w-4 h-4 rounded-full top-3 left-[35%]"></div>
        <div className=" absolute bg-black w-4 h-4 rounded-full top-3 right-[35%]"></div>
        <Image
          className="border-4 border-black"
          src="/images/melika.png"
          alt="عکس من"
          width={350}
          height={360}
        />
        <StarIcon
          className="absolute right-0 bottom-1 "
          size={100}
          color="#FF6258"
        />
        <div className="absolute left-[-5%] top-20 rounded-full w-[70px] h-[70px] flex justify-center p-2 bg-background border-4 shadow-2xl ">
          <LottieIcon src={light} size={50} />
        </div>
      </div>
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
      <LottieIcon src={frog} className="absolute top-[-24%] right-7" />
      <LottieIcon
        src={arrow}
        className="rotate-[190deg] absolute top-[-5%] right-[30%]"
      />
      <LottieIcon src={photoshop} className="absolute top-24 left-30" />
      <LottieIcon src={ai} className="absolute top-24 left-70" />
      <StarIcon
        className="absolute left-0 bottom-[-10%] "
        size={100}
        color="#F3ABCB"
      />
      <StarIcon
        className="absolute left-[-1%] top-[-10%] "
        size={100}
        color="#F3ABCB"
      />
      <StarIcon
        className="absolute left-[55%] top-[-30%] "
        size={140}
        color="#F3ABCB"
      />
    </section>
  );
}
