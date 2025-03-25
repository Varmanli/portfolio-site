import LottieIcon from "@/components/ui/LottieIcon";
import frog from "@/assets/animations/frog.json";
import arrow from "@/assets/animations/arrow.json";
import photoshop from "@/assets/animations/photoshop.json";
import ai from "@/assets/animations/ai.json";
import StarIcon from "@/components/ui/StarIcon";

export default function Decorations() {
  return (
    <>
      <LottieIcon
        src={frog}
        className="absolute top-89 right-53 lg:top-[-24%] lg:right-7"
      />
      <LottieIcon
        src={arrow}
        className="lg:rotate-[190deg] rotate-[20deg]  absolute top-92 right-16 lg:top-[-5%] lg:right-[30%]"
      />
      <LottieIcon
        src={photoshop}
        className="absolute top-135 left-45 lg:top-24 lg:left-30 "
      />
      <LottieIcon
        src={ai}
        className="absolute top-135 left-5 lg:top-24 lg:left-70"
      />
      <StarIcon
        className="absolute bottom-0 left-0 lg:left-0 lg:bottom-[-10%] "
        size={100}
        color="#F3ABCB"
      />
      <StarIcon
        className="absolute top-[-10%] left-4 lg:left-[-1%] lg:top-[-10%] lg:z-20"
        size={100}
        color="#F3ABCB"
      />
      <StarIcon
        className="absolute top-[-13%] left-50 lg:left-[55%] lg:top-[-30%] "
        size={140}
        color="#F3ABCB"
      />
    </>
  );
}
