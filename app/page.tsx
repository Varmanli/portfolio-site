import ProfileCard from "@/components/sections/ProfileCard";
import IntroText from "@/components/sections/IntroText";
import Decorations from "@/components/sections/Decorations";
import { Header } from "@/components/shared/Header";

export default function Home() {
  return (
    <>
      <Header />
      <section className="flex flex-col lg:flex-row justify-center  gap-30 pt-0 lg:pt-20 relative ">
        <ProfileCard />
        <IntroText />
        <Decorations />
      </section>
    </>
  );
}
