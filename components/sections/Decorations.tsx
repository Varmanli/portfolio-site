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
        loop
      />
      <LottieIcon
        src={arrow}
        className="lg:rotate-[190deg] rotate-[40deg]  absolute top-97 right-24 lg:top-[-5%] lg:right-[30%]"
        sizeMobile={125}
      />
      <LottieIcon
        src={photoshop}
        className="absolute top-150 left-45 lg:top-24 lg:left-30 "
        sizeMobile={100}
      />
      <LottieIcon
        src={ai}
        className="absolute top-150 left-15 lg:top-24 lg:left-70"
        sizeMobile={100}
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
    </>
  );
}
