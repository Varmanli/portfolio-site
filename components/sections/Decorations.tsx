import LottieIcon from "@/components/ui/LottieIcon";
import frog from "@/assets/animations/frog.json";
import arrow from "@/assets/animations/arrow.json";
import photoshop from "@/assets/animations/photoshop.json";
import ai from "@/assets/animations/ai.json";
import StarIcon from "@/components/ui/StarIcon";

export default function Decorations() {
  return (
    <>
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
        className="absolute left-[-1%] top-[-10%] z-20"
        size={100}
        color="#F3ABCB"
      />
      <StarIcon
        className="absolute left-[55%] top-[-30%] "
        size={140}
        color="#F3ABCB"
      />
    </>
  );
}
